import React from 'react'
import logo from '../images/carbonara-logo.png'

const Navigation = () => (
  <nav className="uk-navbar-container uk-margin" uk-navbar="">
    <div className="uk-navbar-center">

        <div className="uk-navbar-center-left"><div>
            <ul className="uk-navbar-nav">
                <li className="uk-active"><a href="#">Calculator</a></li>
            </ul>
        </div></div>
        <a className="uk-navbar-item uk-logo" href="#">
            <img width="200" src={logo} />
        </a>
        <div className="uk-navbar-center-right"><div>
            <ul className="uk-navbar-nav">
                <li><a href="#">Greenpaper</a></li>
            </ul>
        </div></div>

    </div>
</nav>
)

export default Navigation
