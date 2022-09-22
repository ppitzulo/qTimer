import React, { useState } from 'react';
import { AreaChart, XAxis, Tooltip, YAxis, ResponsiveContainer, Area } from 'recharts';
import './Stats.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db'


const Stats = ({isActive}) => {
    const [pastSolves, setPastSolves] = useState([]);

    React.useEffect(() => {
        console.log("isacasdf")
        if (!isActive) {
            db.pastSolves.orderBy('id').toArray().then(result => {
                setPastSolves(result);

        })}
    }, [isActive]);
    
    function formatTime(s) {
        let time = "";

        let ms = s % 100;
        s = (s - ms) / 100;
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;

        if (mins > 0) { time += mins + ':'; }
        // if (secs > 0) { time += secs + '.'; }

        return time + secs + '.' + ms;
    }

    function computeAverage(pastSolves, numOfSolves) {
        // console.log("Numsolves: " + numOfSolves);
        // console.log("pastSolvres lenght: " + pastSolves.length);

        if (pastSolves.length < numOfSolves) {return 0}
        
        let solveTime = 0;

        for (let i = pastSolves.length - 1; i > pastSolves.length - (numOfSolves - 1); i--) {
            // console.log("i: " + i);
            solveTime += pastSolves[i].time;
        }
        // for (let i = pastSolves.length - (numOfSolves+1); i < pastSolves.length; i++) {
        //     solveTime += pastSolves[i].time;
        // }
        return Math.floor(solveTime/numOfSolves);
    }
    
    function getBestTime(pastSolves) {
        let bestTime = -1;

        for (let i = 0; i < pastSolves.length; i++) {
            if (bestTime == -1 || pastSolves[i].time < bestTime) {
                bestTime = pastSolves[i].time;
            }
        }
        return bestTime;
    }

    return (
        <div class="statsContainer">
            <div class="Statistics bRadius">
                <span>
                    Best: {formatTime(getBestTime(pastSolves))}
                </span>
                <span>
                    Ao5: {formatTime(computeAverage(pastSolves, 5))}
                </span>
                <span>
                    Ao12 {formatTime(computeAverage(pastSolves, 12))}
                </span>
            </div>
            <div class="Graph bRadius">
                <ResponsiveContainer width="100%">
                    <AreaChart  data={pastSolves} options={{maintainAspectRatio: false}}>
                        <XAxis dataKey="id"/>
                        <Tooltip />
                        <YAxis dataKey="time"/>
                        <Area type="monotone" dataKey="time"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div class="timesContainer bRadius">
                <div class="Times">
                    {
                        pastSolves.slice(0).reverse().map((solve) => (
                            <div>
                                <span id="id">{solve.id}.</span>
                                <span id="solve">{formatTime(solve.time)}</span>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </div>
    )
}

export default Stats;