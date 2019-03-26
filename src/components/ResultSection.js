import React, {Component} from 'react'
import car from '../assets/car.svg'
import tree from '../assets/tree.svg'

class ResultSection extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            color: 'secondary',
            result: 0,
            label: 'Result'
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div uk-grid="">
                    <div className="uk-width-1-2"></div>
                    <div className="uk-width-1-2">
                        <p className="uk-text-muted">correspond to</p>
                    </div>
                </div>
                <div uk-grid="" uk-height-match=".uk-card-media-top" className="uk-flex uk-flex-middle">
                    <div className="uk-width-1-2">
                        <h2 className="uk-text-huge">{ this.props.result } <small>kg</small></h2>
                        <p className="uk-text-muted">CO<sub>2</sub> emissions</p>
                    </div>
                    <div className="uk-width-1-4">
                        <div className="uk-card">
                            <div className="uk-card-media-top">
                                <img className="uk-height-small uk-margin-medium-left" src={car} />
                            </div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title"><strong>{ this.props.result * 6 } km</strong> <br />driven by car</h3>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-1-4">
                        <div className="uk-card">
                            <div className="uk-card-media-top">
                                <img className="uk-height-small uk-margin-medium-left" src={tree} />
                            </div>
                            <div className="uk-card-body">
                                <h3 className="uk-card-title"><strong>{ Math.round(this.props.result * 30 / 365) } years</strong> of CO<sub>2</sub> <br />sequestration</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ResultSection;
