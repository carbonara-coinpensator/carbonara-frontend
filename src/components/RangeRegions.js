import React, {Component} from 'react'
import { Range, getTrackBackground } from 'react-range'
import RegionInfos from './RegionInfos'

const STEP = 1
const MIN = 0
const MAX = 100

class RangeRegions extends Component {

    constructor(...props) {

        super(...props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            regionButtons: this.props.regionButtons,
            colors: []
        }

    }

    onChange(regionButtons) {
        this.setState({ regionButtons });
        this.props.onRegionsChange(regionButtons);
    }

    getColors() {
        let colors = []
        RegionInfos.forEach(function(v,k){
            colors.push(v.color)
        })
        this.setState({colors})
    }

    componentDidMount() {
        this.getColors()
    }

    render() {

        const regionButtons = this.props.regionButtons
        const consumptionsPercent = this.props.consumptionsPercent
        const colors = this.state.colors

        return (

            <div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    <Range
                        values={regionButtons}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(regionButtons) => this.onChange( regionButtons )}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: '32px',
                                    display: 'flex',
                                    width: '100%'
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: '3px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                            values: regionButtons,
                                            colors: colors,
                                            min: MIN,
                                            max: MAX
                                        }),
                                        alignSelf: 'center'
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged, index }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 0px 4px #999'
                                }}
                            >
                            <div
                                style={{
                                    height: '12px',
                                    width: '3px',
                                    backgroundColor: isDragged ? colors[index] : '#CCC'
                                }}
                            />
                            </div>
                        )}
                    />
                    <div uk-grid="" className="uk-flex-center uk-margin">
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[0] }}>CA: {consumptionsPercent[0].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[1] }}>CN: {consumptionsPercent[1].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[2] }}>EU: {consumptionsPercent[2].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[3] }}>JP: {consumptionsPercent[3].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[4] }}>SG: {consumptionsPercent[4].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: colors[5] }}>US: {consumptionsPercent[5].toFixed(0)}%</span>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default RangeRegions;
