import React from 'react';
import { AreaChart, Line, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer, Area } from 'recharts';
import './Stats.css';
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];


const Stats = () => {
    // let pastSolves = {"Value": 1, "Value": 2, "Value": 3}
    const pastSolves = [];

    for (let i = 0; i <= 30; i++) {
        pastSolves.push({
            date: Math.floor(Math.random() * 10),
            value: Math.floor(Math.random() * 10),
        })
    }
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
                        <XAxis dataKey="date"/>
                        <Tooltip />
                        <YAxis />
                        <Area type="monotone" dataKey="value"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Stats;