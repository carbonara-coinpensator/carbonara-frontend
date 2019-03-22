import React, {Component} from 'react';
import { Range, getTrackBackground, Direction } from 'react-range';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ['#0C2960', '#276EF1', '#9CBCF8'];

class RangeCountries extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            values: this.props.values,
        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(values) {
        this.setState({ values });
        this.props.onChange(values);
    }

    componentDidMount() {

    }

    render() {

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
                        values={this.state.values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={values => this.onChange( values )}
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
                                            values: this.state.values,
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
                            <span className="uk-label uk-label-danger">US: {this.state.values[0].toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label uk-label-success">EU: {(this.state.values[1] - this.state.values[0]).toFixed(0)}%</span>
                        </div>
                        <div>
                            <span className="uk-label uk-label-warning">CN: {(100 - this.state.values[1]).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default RangeCountries;
