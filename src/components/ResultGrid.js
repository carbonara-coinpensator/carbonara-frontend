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

        return (
            <div>
                <div className={'uk-flex uk-flex-column'} uk-scrollspy="cls: uk-animation-fade; repeat: true">
                    <div className="uk-width-1-1@m uk-text-center">
                        <div className="uk-width-1-1 uk-text-center uk-text-large">
                            <p className="uk-text-muted">CO<sub>2</sub> emissions</p>
                        </div>
                        <p className="uk-text-huge">{ Math.round(this.props.result) } <small>kg</small></p>
                    </div>
                    <div className=" uk-width-1-1@m">
                        <div className="uk-width-1-1 uk-text-center uk-text-large">
                            <p className="uk-text-muted">correspond to</p>
                        </div>
                        <div className="uk-grid-collapse" uk-height-match=".uk-card-media-top">
                            <div className="uk-width-1-1">
                                <div className="uk-card uk-card-small">
                                    <div className="uk-card-media-top">
                                        <img className="uk-height-small" src={car} alt="" />
                                    </div>
                                    <div className="uk-card-body">
                                        <h3 className="uk-card-title"><strong>{ kilometersDrivenByCar }&nbsp;km</strong> <br />driven by&nbsp;car</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-1-1">
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
