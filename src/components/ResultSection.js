import React, {Component} from 'react'
import ResultGrid from './ResultGrid'
import logonature from '../assets/logo-naturefund.png'
import logoplanet from '../assets/logo-planet.svg'

class ResultSection extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            color: 'secondary'
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <ResultGrid result={this.props.result} scrollSticky={true} position="top" type="secondary" />

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
