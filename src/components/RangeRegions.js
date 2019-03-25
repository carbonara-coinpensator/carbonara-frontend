import React, {Component} from 'react';
import { Range, getTrackBackground, Direction } from 'react-range';

const STEP = 0.1;
const MIN = 0;
const MAX = 2800;
const COLORS = ['#9CBCF8', 'red', '#276EF1', 'orange', 'green', '#0C2960'];

class RangeRegions extends Component {

    constructor(...props) {

        super(...props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            regionButtons: this.props.regionButtons,
        }

    }

    onChange(regionButtons) {
        this.setState({ regionButtons });
        this.props.onRegionsChange(regionButtons);
    }

    componentDidMount() {

    }

    render() {

        const amounts = this.props.emissionsPercent
        const regionButtons = this.props.regionButtons

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
                        onChange={regionButtons => this.onChange( regionButtons )}
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
                                            colors: COLORS,
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
                                    borderRadius: '1px',
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
                                    backgroundColor: isDragged ? COLORS[index] : '#CCC'
                                }}
                            />
                            </div>
                        )}
                    />
                    <div uk-grid="" className="uk-flex-center uk-margin">
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[0] }}>CA: {amounts[0]}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[1] }}>CN: {amounts[1]}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[2] }}>EU: {amounts[2]}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[3] }}>JP: {amounts[3]}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[4] }}>SG: {amounts[4]}%</span>
                        </div>
                        <div>
                            <span className="uk-label" style={{ backgroundColor: COLORS[5] }}>US: {amounts[5]}%</span>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default RangeRegions;
