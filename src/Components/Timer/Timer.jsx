import React, { useState } from 'react';
import './Timer.css';


function tets(minutes) {
    var start = Date.now();
// setInterval(function() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    // output(Math.floor(delta / 1000)); // in seconds
    // alternatively just show wall clock time:
        // output(new Date().toUTCString());
        // return Math.floor(delta / 1000);
    minutes = Math.floor(delta/1000);
    // seconds = Math.floor(delta/100);
    console.log(minutes)
    minutes = 8;
    console.log("Clicked");
    console.log(minutes)
// }, 1000); // update about every second
}

function getMiliseconds(time, totalMiliseconds) {
    return String((totalMiliseconds - (time * 1000)))[0];
}

const Timer = () => {

    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    // let firstRun = true;
    const [firstRun, setFirstRun] = useState(true);
    const [start, setStart] = useState(0);
    // console.log("test");
    // console.log(firstRun)
    if (isActive) {
        if (firstRun) {
            setStart(Date.now());
            setFirstRun(false);
        }
        // console.log(start);
        setInterval(() => {
            // var delta = Date.now() - start;
            setTime(Date.now() - start);
            // console.log(time);
            // console.log(start);
            // setTime((time) => time + 10);
        }, 1);
        // setInterval(() => {
        //     setTime((time) => time + 1);
        // }, 10);
    }

    return (
        <div class="Timer">
            <div class="Segments" onClick={setIsActive}>
                <div class="minuteSegment">
                    <span>{String(parseInt(time/60000)%60)[0]}</span>
                    <span>{String(parseInt(time/60000)%60)[1]}</span>
                    <span>:</span>
                </div>
                <div class="secondSegment">
                    <span>{String(parseInt(time/1000)%60)[0]}</span>
                    <span>{String(parseInt(time/1000)%60)[1]}</span>
                    <span>.</span>
                </div>
                <div class="millisecondSegment">
                    <span>{getMiliseconds((parseInt(time/1000)%60), time)}</span>
                </div>
            </div>
        </div>
    )
}

export default Timer