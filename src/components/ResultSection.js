import React, {Component} from 'react'
import ResultGrid from './ResultGrid'
import naturefund from '../static/media/logo-naturefund.png'
import arktik from '../static/media/logo-arktik.png'

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

                <div uk-sticky="cls-active: calculation-result-active">
                    <ResultGrid result={this.props.result} type="secondary" position="top" />
                </div>

                <div className="uk-margin-large-top" uk-height-match=".uk-tile">
                    <p className="">Here are some compensation options for you:</p>

                    <div uk-grid="" className="uk-flex uk-flex-center uk-animation-fast uk-child-width-1-6@m uk-child-width-1-4" uk-scrollspy="target: > div; cls: uk-animation-slide-right-small; repeat: true; delay: 200">
                        <div>
                            <a className="uk-animation-toggle" target="naturefund" rel="noopener noreferrer" href="https://www.naturefund.de/wissen/co2_rechner/">
                                <div className="uk-inline-clip uk-transition-toggle uk-tile uk-tile-default uk-padding-remove uk-width-1-1" tabIndex="0">
                                    <img className="uk-width-1-1" src={naturefund} alt="" />
                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle">
                                        <div className="uk-position-center">
                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a href="https://www.arktik.de/CO2-ausgleich" target="aktik" className="uk-animation-toggle">
                                <div className="uk-inline-clip uk-transition-toggle uk-tile uk-tile-default uk-padding-remove uk-width-1-1" tabIndex="0">
                                    <img className="uk-width-1-1" src={arktik} alt="" />
                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle">
                                        <div className="uk-position-center">
                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default ResultSection;
