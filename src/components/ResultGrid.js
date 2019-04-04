import React, {Component} from 'react'
import car from '../static/media/car.svg'
import tree from '../static/media/tree.svg'

class ResultGrid extends Component {

    constructor(...props) {
        super(...props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        let kilometersDrivenByCar = Math.round(this.props.result * 6)
        let yearsOfCo2Sequestration = Math.round(this.props.result * 30 / 365)
        let className = this.props.scrollSticky ? 'calculation-results uk-flex uk-flex-middle uk-grid-divider' : 'uk-flex uk-flex-middle calculation-results calculation-results-active calculation-results-fixed calculation-results-' + this.props.position + ' calculation-results-' + this.props.type
        let ukSticky = this.props.scrollSticky ? 'animation: uk-animation-slide-top; cls-active: calculation-results-active calculation-results-' + this.props.position + ' calculation-results-' + this.props.type + ';' : 'false'

        return (
            <div>
                <div uk-grid="" className="grid-label uk-flex uk-flex-bottom">
                    <div className="uk-width-1-2 uk-text-right">
                        <p className="uk-text-muted">CO<sub>2</sub> emissions</p>
                    </div>
                    <div className="uk-width-1-2 uk-text-left">
                        <p className="uk-text-muted">correspond to:</p>
                    </div>
                </div>
                <div uk-grid="" className={className} uk-sticky={ukSticky}>
                    <div className="uk-width-1-4 uk-width-1-2@m uk-text-right">
                        <h2 className="uk-text-huge">{ Math.round(this.props.result) } <small>kg</small></h2>
                    </div>
                    <div className="uk-width-3-4 uk-width-1-2@m">
                        <div uk-grid="" className="uk-grid-collapse" uk-height-match=".uk-card-media-top">
                            <div className="uk-width-1-2">
                                <div className="uk-card uk-card-small">
                                    <div className="uk-card-media-top">
                                        <img className="uk-height-small" src={car} alt="" />
                                    </div>
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title"><strong>{ kilometersDrivenByCar }&nbsp;km</strong> <br />driven by&nbsp;car</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-1-2">
                                <div className="uk-card uk-card-small">
                                    <div className="uk-card-media-top">
                                        <img className="uk-height-small" src={tree} alt="" />
                                    </div>
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title"><strong>{ yearsOfCo2Sequestration }&nbsp;years</strong> of&nbsp;CO<sub>2</sub> <br />sequestration</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ResultGrid;
