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

    return (
        <div class="Stats">
            <div class="StatsContainer">
                <ul>
                    <li>
                        Best:
                    </li>
                    <li>
                        Ao5
                    </li>
                    <li>
                        Ao12
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