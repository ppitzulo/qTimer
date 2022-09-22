import React, { useState } from 'react';
import { AreaChart, Line, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer, Area } from 'recharts';
import './Stats.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db'


const Stats = () => {
    const [pastSolves, setPastSolves] = useState([]);

    React.useEffect(() => {
        db.pastSolves.orderBy('id').toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                setPastSolves(array => [...array, {id: result[i].id, time: result[i].time}]);
            }
        })
    }, []);

    const updateSolves = useLiveQuery(() =>
        db.pastSolves.orderBy('id').toArray().then(result => {
                setPastSolves(array => [...array, {id: result[result.length-1].id, time: result[result.length-1].time}]);
            console.log(pastSolves);
        }));

    
    function formatTime(s) {
        // let formattedTime = "";
        var ms = s % 10;
        s = (s - ms) / 10;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;

        return mins + ':' + secs + '.' + ms;
    }

    function computeAverage(pastSolves, numOfSolves) {
        console.log(numOfSolves);
        if (pastSolves.length < numOfSolves) {return 0}
        
        let solveTime = 0;

        for (let i = pastSolves.length - (numOfSolves+1); i < pastSolves.length; i++) {
            solveTime += pastSolves[i].time;
        }
        return Math.floor(solveTime/numOfSolves);
    }

    return (
        <div class="Stats">
            <div class="StatsContainer">
                <ul>
                    <li>
                        Best: {formatTime(191)}
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
                <ResponsiveContainer width="100%">
                    <AreaChart  data={pastSolves} options={{maintainAspectRatio: false}}>
                        <XAxis dataKey="id"/>
                        <Tooltip />
                        <YAxis dataKey="time"/>
                        <Area type="monotone" dataKey="time"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Stats;