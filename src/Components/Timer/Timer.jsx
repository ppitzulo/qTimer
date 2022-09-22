import React, { useState, useRef } from 'react';
import { Scrambler } from '../../Components';
import './Timer.css';
import { db } from '../../db';


const Timer = ({isActive, setIsActive}) => {
    const [time, setTime] = useState(0);
    const [inspectionTimeEnabled, enableInspectionTime] = useState(false);
    const firstRun = useRef(true);
    const listenerEnabled = useRef(false);
    const start = useRef(0);
    
    React.useEffect(() => {
        if (!inspectionTimeEnabled) {
            if (!firstRun.current) {
                if (!isActive) {
                    addTime(time);
                }
            }
        }
    }, [isActive, time]);

    React.useEffect(() => {
        let counterId;
        
        if (isActive) {
            if (firstRun.current) {
                start.current = Date.now();
                firstRun.current = false;
            }
            if (inspectionTimeEnabled && time === 0) {
                setIsActive(isActive => !isActive);
            }
            counterId = setInterval(() => {
                inspectionTimeEnabled ? setTime(15 - Math.floor((Date.now() - start.current)/1000)) :  setTime(Math.floor((Date.now() - start.current)/10));
            }, 1);
            
        }
        else {
            firstRun.current = true;
        }
        return () => {
            clearTimeout(counterId);
        }
    }, [time, isActive]);

    

    function addTime(time) {
        try {
            db.pastSolves.add({
                time: time,
            });
        } catch(error) {
            console.log(`Failed to add ${time}: ${error}`);
        }
    }

    React.useEffect(() => {
        if (!listenerEnabled.current) {
            window.addEventListener("keydown", (e) => {if (e.key === ' ') {setIsActive(isActive => !isActive)}});
            listenerEnabled.current = true;
        }
        return () => {
            window.removeEventListener("keydown", (e) => {if (e.key === ' ') {setIsActive(isActive => !isActive)}});
        }
    }, [setIsActive]);

    return (
        <div class="TimerContainer">
            <Scrambler isActive={isActive}/>
            <div class="Timer">
                {!inspectionTimeEnabled ? 
                <div class="Segments" onClick={() => setIsActive(isActive => !isActive)}>
                    <div class="minuteSegment" style={{color: "green"}}>
                        <span>{time >= 6000 ? Math.floor((Math.floor(time/100)) / 60) : ""}</span>
                        <span>{time >= 6000 ? ":" : ""}</span>
                    </div>
                    <div class="secondSegment" style={{color: "green"}}>
                        <span>{time >= 1000 ? Math.floor(time / 1000) % 6 : ""}</span>
                        <span>{Math.floor(time / 100) % 10}</span>
                        <span>.</span>
                    </div>
                    <div class="millisecondSegment" style={{color: "green"}}>
                        <span>{Math.floor(time / 10) % 10}</span> 
                        <span>{!isActive ? time % 10 : ""}</span>  
                    </div>
                </div>
                :
                <div class="inspectionTimer" onClick={isActive ? () => enableInspectionTime(inspectionTimeEnabled => !inspectionTimeEnabled) : () => setIsActive(isActive => !isActive)}>
                    <div class="secondSegment">
                        <span>{time ? time : "DNF"}</span>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Timer