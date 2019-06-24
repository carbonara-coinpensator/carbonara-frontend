import React, {Component} from 'react'
import car from '../static/media/car.svg'
import tree from '../static/media/tree.svg'

class ResultGrid extends Component {

    constructor(...props) {
        super(...props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        let kilometersDrivenByCar = Math.round(this.props.result * 6)
        let yearsOfCo2Sequestration = Math.round(this.props.result * 30 / 365)
        let antiposition = this.props.position === 'top' ? 'bottom' : 'top'

        return (
            <div>

                { !this.props.showSticky &&
                    <div uk-grid="" className={'calcgrid calcgrid-' + this.props.type + ' calcgrid-' + this.props.position + ' uk-flex uk-flex-middle'} uk-scrollspy="cls: uk-animation-fade; repeat: true">
                        <div className="uk-width-1-1 uk-width-1-2@m uk-text-center">
                            <h2 className="uk-text-huge uk-margin-remove">{ Math.round(this.props.result) } <small>kg</small></h2>
                            <p className="uk-text-muted">CO<sub>2</sub> emissions correspond to:</p>
                        </div>
                        <div className="uk-width-1-1 uk-width-1-2@m">
                            <div uk-grid="" className="uk-grid-collapse uk-child-width-1-2" uk-height-match=".uk-card-media-top">
                                <div className="">
                                    <div className="uk-card uk-card-small">
                                        <div className="uk-card-media-top">
                                            <img className="uk-height-small" src={car} alt=""/>
                                        </div>
                                        <div className="">
                                            <h3 className="uk-card-title">
                                                <strong>{kilometersDrivenByCar}&nbsp;km</strong> <br/>driven by&nbsp;car
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="uk-card uk-card-small">
                                        <div className="uk-card-media-top">
                                            <img className="uk-height-small" src={tree} alt=""/>
                                        </div>
                                        <div className="">
                                            <h3 className="uk-card-title">
                                            <strong>{yearsOfCo2Sequestration}&nbsp;years</strong> of&nbsp;CO<sub>2</sub>
                                            <br/>sequestration</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                { this.props.showSticky &&
                    <div uk-sticky="cls-inactive: uk-invisibl; cls-active: uk-visible" className={'uk-width-1-1 sticky' + this.props.position}>
                        <div className={'uk-width-1-1 uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-align-center uk-margin-remove-bottom uk-light uk-position-' + this.props.position + ' uk-background-' + this.props.type}>
                            <div uk-grid="" className="uk-flex uk-flex-middle uk-grid-collapse">
                                <div className="uk-width-1-6 uk-text-center">
                                    <div className="uk-inline uk-text-small">
                                        <a href="" uk-icon="icon: question;"></a>
                                        <div uk-drop={'pos: ' + antiposition + '-center'}>
                                            <div className={'uk-card uk-card-small uk-card-body uk-card-' + this.props.type}>Calculations are based on several assumptions, therefore the underlying data and calculation results are only approximations, and could change as more information is gathered.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="uk-width-5-6 uk-text-left">
                                    <div>
                                        <strong>{Math.round(this.props.result)} kg</strong> <span className="uk-text-muted uk-text-small">CO<sub>2</sub> emissions correspond to:</span>
                                    </div>
                                    <div>
                                        <strong>{kilometersDrivenByCar}&nbsp;km</strong>&nbsp;<span className="uk-text-muted uk-text-small">driven by&nbsp;car</span>
                                    </div>
                                    <div>
                                        <strong>{yearsOfCo2Sequestration}&nbsp;years</strong>&nbsp;<span className="uk-text-muted uk-text-small">of CO<sub>2</sub> sequestration</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default ResultGrid;
