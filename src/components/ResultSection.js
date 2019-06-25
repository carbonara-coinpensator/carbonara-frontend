import React, {Component} from 'react'
import ResultGrid from './ResultGrid'
import naturefund from '../static/media/logo-naturefund.png'

class ResultSection extends Component {

    constructor(...props) {
        super(...props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <ResultGrid result={this.props.result} showSticky={false} type={this.props.color} position="top" />

                <div className="" uk-height-match=".uk-tile">
                    <p className="">Here you can compensate on your CO<sub>2</sub> emissions:</p>
                    <div uk-grid="" className="uk-flex-center uk-flex-middle uk-animation-fast uk-grid-small">
                        <div className="uk-width-2-5 uk-width-1-3@m" uk-scrollspy="cls: uk-animation-slide-right-small; repeat: true; delay: 350">
                            <a className="uk-animation-toggle" target="naturefund" rel="noopener noreferrer" href={`https://www.naturefund.de/en/projects/compensation/?kgco2=${Math.round(this.props.result)}`}>
                                <div className="uk-inline-clip uk-transition-toggle uk-tile uk-tile-default uk-padding-remove " tabIndex="0">
                                    <img className="" src={naturefund} alt="" />
                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle">
                                        <div className="uk-position-center">
                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="uk-width-3-5 uk-width-2-3@m" uk-scrollspy="cls: uk-animation-slide-right-small; repeat: true; delay: 350">
                            <span className="uk-text-small uk-text-muted">
                                Please note that the compensation page will only show reasonable values if you compensate 300kg or more
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default ResultSection;
