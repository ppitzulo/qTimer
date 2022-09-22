import React from 'react';
import Icon from './Icon.svg';
import './Header.css';

const Header = () => {
    return (
        <div class="Header">
                <img src={Icon} alt="Black and white speed cube."/>
                <div class="Title">
                    qTimer
                </div>
        </div>
    )
}

export default Header;