import React, { useState } from 'react';
import './Scrambler.css';

const Scrambler = ({ isActive }) => {
    const [updateScramble, setScramble] = useState("");

    function genRandomNum(bound) {
        return Math.floor(Math.random() * bound);
    }

    React.useEffect(() => {
        if (!isActive) {
            let moves = ['L', 'R', 'U', 'D', 'F', 'B'];
            let prevMove = '';
            let move = "";
            let scramble = "";

            for (let i = 0; i < 25; i++) {
                if(scramble.length === 0) {
                    move = moves[genRandomNum(6)];
                }
                else {
                    while (move[0] === prevMove) {
                        move = moves[genRandomNum(6)];
                    }
                }
                prevMove = move;
                switch(genRandomNum(2)) {
                    case 0:
                        {
                            move += '\'';
                            break;
                        }
                    case 1:
                        {
                            move += '2';
                            break;
                        }   
                }
                scramble += move + ' ';
            }
            setScramble(scramble);

        }
    }, [isActive]);

    return (
        <div className="Scramble">
            {updateScramble}
        </div>
    )
}

export default Scrambler