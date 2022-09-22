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
        // let formattedTime = "";
        var ms = s % 100;
        s = (s - ms) / 100;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;

        return mins + ':' + secs + '.' + ms;
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
        <div class="Stats">
            <div class="StatsContainer">
                <ul>
                    <li>
                        Best: {formatTime(getBestTime(pastSolves))}
                    </li>
                    <li>
                        Ao5: {formatTime(computeAverage(pastSolves, 5))}
                    </li>
                    <li>
                        Ao12 {formatTime(computeAverage(pastSolves, 12))}
                    </li>
                </ul>
            </div>
            <div class="Graph">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart  data={pastSolves} options={{maintainAspectRatio: false}}>
                        <XAxis dataKey="id"/>
                        <Tooltip />
                        <YAxis dataKey="time"/>
                        <Area type="monotone" dataKey="time"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {                    console.log("ran history")}
            {            console.log( pastSolves)}
            <div class="History">
                {
                    pastSolves.slice(0).reverse().map((solve) => (
                        <div>
                        {/* {console.log(solve)} */}

                            <span id="id">{solve.id}.</span>
                            <span id="solve">{formatTime(solve.time)}</span>
                        </div>
                    ))
                }
            
            </div>  
        </div>
    )
}

export default Stats;