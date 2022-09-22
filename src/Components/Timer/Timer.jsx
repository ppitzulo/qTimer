import React, { useState, useRef } from 'react';
// import Dexie, { Table } from 'dexie';
import './Timer.css';
import { db } from '../../db';




const Timer = () => {

    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [firstRun, setFirstRun] = useState(true);
    const [start, setStart] = useState(0);
    // const [intervalID, setIntervalID] = us(0);
    const intervalID = useRef(0);

    console.log("IntervalID: " + intervalID.current);
    React.useEffect(() => {
        let counterId;

        if (isActive) {
            if (firstRun) {
                setStart(Date.now());
                setFirstRun(false);
            }
            counterId = setInterval(() => {
                setTime(Date.now() - start);
            }, 1);
        }
        else {
            setTime(0);
            setFirstRun(true);

        }

        return () => {
            clearTimeout(counterId);
        }
    }, [time, isActive, isActive, start]);

    const setActive = (isActive) => {
        setIsActive({});
        console.log("test")
    }

    function getMiliseconds(time, totalMiliseconds) {
        return String((totalMiliseconds - (time * 1000)))[0];
    }

    async function addTime(time) {
        try {
            const id = await db.pastSolves.add({
                time
            });
        } catch(error) {
            console.log(`Failed to add ${time}: ${error}`);
        }
    }

    return (
        <div class="Timer">
            <div class="Segments" onClick={() => setIsActive(isActive => !isActive)}>
                <div class="minuteSegment" style={{color: "green"}}>
                    <span>{String(parseInt(time/60000)%60)[0]}</span>
                    <span>{String(parseInt(time/60000)%60)[1]}</span>
                    <span>:</span>
                </div>
                <div class="secondSegment" style={{color: "green"}}>
                    <span>{String(parseInt(time/1000)%60)[0]}</span>
                    <span>{String(parseInt(time/1000)%60)[1]}</span>
                    <span>.</span>
                </div>
                <div class="millisecondSegment" style={{color: "green"}}>
                    <span>{getMiliseconds((parseInt(time/1000)%60), time)}</span>
                </div>
            </div>
        </div>
    )
}

export default Timer