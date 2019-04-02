import React, {Component} from 'react'
import car from '../assets/car.svg'
import tree from '../assets/tree.svg'
import logonature from '../assets/logo-naturefund.png'
import logoplanet from '../assets/logo-planet.svg'

class ResultSection extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            color: 'secondary',
            result: 0,
            label: 'Result',
            kilometersDrivenByCar: Math.round(this.props.result * 6),
            yearsOfCo2Sequestration: Math.round(this.props.result * 30 / 365)
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <div uk-grid="" className="uk-flex uk-flex-bottom">
                    <div className="uk-width-1-2 uk-text-right">
                        <p className="uk-text-muted">CO<sub>2</sub> emissions</p>
                    </div>
                    <div className="uk-width-1-2 uk-text-left">
                        <p className="uk-text-muted">correspond to:</p>
                    </div>
                </div>
                <div uk-grid="" className="uk-flex uk-flex-middle uk-grid-divider"
                    uk-sticky="animation: uk-animation-slide-top; cls-active: calculation-results-active;">
                    <div className="uk-width-1-2 uk-text-right">
                        <h2 className="uk-text-huge">{ Math.round(this.props.result) } <small>kg</small></h2>
                    </div>
                    <div className="uk-width-1-2">
                        <div uk-grid="" className="uk-grid-collapse" uk-height-match=".uk-card-media-top">
                            <div className="uk-width-1-2">
                                <div className="uk-card uk-card-small">
                                    <div className="uk-card-media-top">
                                        <img className="uk-height-small" src={car} alt="" />
                                    </div>
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title"><strong>{ this.state.kilometersDrivenByCar }&nbsp;km</strong> <br />driven by&nbsp;car</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-1-2">
                                <div className="uk-card uk-card-small">
                                    <div className="uk-card-media-top">
                                        <img className="uk-height-small" src={tree} alt="" />
                                    </div>
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title"><strong>{ this.state.yearsOfCo2Sequestration }&nbsp;years</strong> of&nbsp;CO<sub>2</sub> <br />sequestration</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-margin-large-top" uk-height-match=".uk-card">
                    <h3 className="">Here are some compensation options for you:</h3>

                    <div className="uk-child-width-1-6 uk-light uk-flex uk-flex-center" uk-grid="" uk-height-match=".img">
                        <div>
                            <div className="uk-card uk-card-default uk-card-small">
                                <div className="uk-card-body">
                                    <a className="" target="_blank" rel="noopener noreferrer" href="https://www.naturefund.de/wissen/co2_rechner/">
                                        <div className="img uk-flex uk-flex-middle">
                                            <img src={logonature} alt="" />
                                        </div>
                                        <p>Nature Fund</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="uk-card uk-card-default uk-card-small">
                                <div className="uk-card-body">
                                    <a className="" target="_blank" rel="noopener noreferrer" href="https://www.plant-for-the-planet.org/de/startseite">
                                        <div className="img uk-flex uk-flex-middle">
                                            <img src={logoplanet} alt="" />
                                        </div>
                                        <p>Plant for the Planet</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default ResultSection;
