import React from 'react';
import Icon from './Icon.svg';
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
                <img src={Icon} alt="Black and white speed cube."/>
                <div className="Title">
                    qTimer
                </div>
        </div>
    )
}

export default Header;