import React from 'react'
import logo from '../static/media/carbonara-logo.png'

const Navigation = () => (
    <nav className="uk-navbar-container uk-width-1-1 uk-position-absolute uk-position-top">
        <div className="uk-container">
            <div uk-navbar="">
                <div className="uk-navbar-center">
                    <a className="uk-navbar-item uk-logo" href="/">
                        <img className="uk-width-small uk-width-medium@m" src={logo} alt=""/>
                    </a>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        <li><a target="greenpaper" href="https://github.com/carbonara-coinpensator/carbonara-backend/blob/master/greenpaper/GreenPaper.pdf">Greenpaper</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
);

export default Navigation
