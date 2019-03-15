import React, {Component} from 'react';
import car from './images/car.svg';
import tree from './images/tree.svg';

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
            <section className={'uk-section uk-section-large uk-section-' + this.props.color }>

                <div className="uk-container uk-position-relative">

                    <span className="uk-label uk-position-top-right">{ this.props.label }</span>

                    <div uk-grid="">
                        <div className="uk-width-1-3">
                            
                        </div>
                        <div className="uk-width-2-3">
                            <p className="uk-text-muted">correspond to</p>
                        </div>
                    </div>

                    <div uk-grid="" uk-height-match=".uk-card-media-top">
                        <div className="uk-width-1-3">
                            <h2 className="uk-text-huge">{ this.props.result } <small>kg</small></h2>
                            <p className="uk-text-muted">CO<sub>2</sub> emissions</p>
                        </div>
                        <div className="uk-width-1-3">
                            <div className="uk-card">
                                <div className="uk-card-media-top">
                                    <img className="uk-height-small uk-margin-medium-left" src={car} />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title"><strong>{ this.props.result * 6 } km</strong> driven by car</h3>
                                </div>
                            </div>
                        </div>
                        <div className="uk-width-1-3">
                            <div className="uk-card">
                                <div className="uk-card-media-top">
                                    <img className="uk-height-small uk-margin-medium-left" src={tree} />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title"><strong>{ Math.round(this.props.result * 30 / 365) } years</strong> of CO<sub>2</sub> sequestration</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}
export default ResultSection;