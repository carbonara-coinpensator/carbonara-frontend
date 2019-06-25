import React from 'react'
import logo from '../static/media/carbonara-logo.png'

const Navigation = () => (
    <nav className="uk-navbar-container uk-width-1-1 uk-position-absolute uk-position-top">
        <div className="uk-container">
            <div uk-navbar="">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a target="greenpaper" href="https://github.com/carbonara-coinpensator/carbonara-backend/blob/master/greenpaper/GreenPaper.pdf" uk-tooltip="pos: bottom; title: Download Greenpaper PDF from carbonara-backend repository in GitHub">
                                Greenpaper
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <a className="uk-navbar-item uk-logo" href="/">
                        <img className="uk-width-small uk-width-medium@m" src={logo} alt=""/>
                    </a>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a target="github" href="https://github.com/carbonara-coinpensator" uk-tooltip="pos: bottom; title: Visit the project on GitHub">
                                <span className="uk-icon uk-margin-small-right" uk-icon="icon: github"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
);

export default Navigation
