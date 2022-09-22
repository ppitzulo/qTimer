import React, { useState, useRef } from 'react';
import { useWhatChanged } from '@simbathesailor/use-what-changed'
// import Dexie, { Table } from 'dexie';
import './Timer.css';
import { db } from '../../db';




const Timer = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [firstRun, setFirstRun] = useState(true);
    const [start, setStart] = useState(0);
    const isInitialMount = useRef(true);
    let deps = [isActive, time, firstRun, start];

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else if (!isActive) {
            addTime(time);
        }
    }, [isActive]);

    React.useEffect(() => {
        let counterId;
        
        if (isActive) {
            if (firstRun) {
                setStart(Date.now());
                setFirstRun(false);
            }
            counterId = setInterval(() => {
                setTime(Math.floor((Date.now() - start)/100));
            }, 1);
        }
        else {
            setFirstRun(true);
        }

        return () => {
            clearTimeout(counterId);
        }
    }, [time, isActive, start, firstRun]);

    

    function addTime(time) {
        try {
            const id = db.pastSolves.add({
                time
            });
        } catch(error) {
            console.log(`Failed to add ${time}: ${error}`);
        }
    }

    function extractDigit(place, digit) {
        for (; place > 0; place--) {
            digit /= 10;
        }
        return Math.floor(digit % 10);
    }


    return (
        <div class="Timer">
            <div class="Segments" onClick={() => setIsActive(isActive => !isActive)}>
                <div class="minuteSegment" style={{color: "green"}}>
                    <span>{extractDigit(4, time) === 0 ? "" : extractDigit(4,time) % 6}</span>
                    <span>{extractDigit(3, time)}</span>
                    <span>:</span>
                </div>
                <div class="secondSegment" style={{color: "green"}}>
                    <span>{extractDigit(2, time)%6}</span>
                    <span>{extractDigit(1, time)}</span>
                    <span>.</span>
                </div>
                <div class="millisecondSegment" style={{color: "green"}}>
                    <span>{extractDigit(0, time)}</span>                    
                </div>
            </div>
        </div>
    )
}

export default Timer