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
            // console.log("!isActive")
            // console.log("terhoaidf")
            db.pastSolves.orderBy('id').toArray().then(result => {
                console.log(result.length-1);
                console.log(result)
                // console.log("test")
                // if (result.length == 0) {
                //     for (let i = 0; i < result.length; i++) {
                //                     // setPastSolves(array => [...array, {id: result[result.length-1].id, time: result[result.length-1].time}]);
                //     //TODO: Figure out what this is adding the orig contents of the array twice.
                //         setPastSolves(array => [...array, {id: result[i].id, time: result[i].time}]);
                //     }
                // }
                // else {
                    setPastSolves(result);
                    // setPastSolves(array => [...array, {id: result[result.length-1].id, time: result[result.length-1].time}]);
                // }
        })}
    }, [isActive]);

    // const updateSolves = useLiveQuery(() =>
    //     db.pastSolves.orderBy('id').toArray().then(result => {
    //             // if (result.length == 0) {return [];}
    //             // setPastSolves(array => [...array, {id: result[result.length-1].id, time: result[result.length-1].time}]);
    //             console.log("ran");
    //     }));

    
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