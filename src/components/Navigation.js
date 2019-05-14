import React from 'react'
import logo from '../static/media/carbonara-logo.png'

const Navigation = () => (
    <nav className="uk-navbar-container uk-margin" uk-navbar="">
        <div className="uk-navbar-left">
            <div>
                <ul className="uk-navbar-nav">
                    <li className="uk-active"><a href="/">Calculator</a></li>
                </ul>
            </div>
        </div>
        <div className="uk-navbar-center">

            <a className="uk-navbar-item uk-logo" href="/">
                <img width="200" src={logo} alt=""/>
            </a>

        </div>
        <div className="uk-navbar-right">
            <div>
                <ul className="uk-navbar-nav">
                    <li><a href="/greenpaper">Greenpaper</a></li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navigation
