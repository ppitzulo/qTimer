import React, { useState, useRef } from 'react';
import { Scrambler } from '../../Components';
import './Timer.css';
import { db } from '../../db';


const Timer = ({isActive, setIsActive}) => {
    const [time, setTime] = useState(0);

    const firstRun = useRef(true);
    const start = useRef(0);
    
    React.useEffect(() => {
        if (!firstRun.current) {
            if (!isActive) {
                addTime(time);
                console.log("Added time");
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
            counterId = setInterval(() => {
                setTime(Math.floor((Date.now() - start.current)/10));
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
        window.addEventListener("keydown", (e) => {if (e.key === ' ') {setIsActive(isActive => !isActive)}});

        return () => {
            window.removeEventListener("keydown", (e) => {if (e.key === ' ') {setIsActive(isActive => !isActive)}});
        }
    }, []);

    return (
        <div class="TimerContainer">
            <Scrambler isActive={isActive}/>
            <div class="Timer">
                <div class="Segments" onClick={() => setIsActive(isActive => !isActive)}>
                    <div class="minuteSegment" style={{color: "green"}}>
                        {/* <span>{extractDigit(4, time) === 0 ? "" : extractDigit(4,time) % 6}</span> */}
                        {/* <span>{time >= 60000 ? Math.floor(time/10000) % 6 : ""} </span> */}
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
            </div>
        </div>
    )
}

export default Timer