import React, {Component} from 'react';
import { Range, getTrackBackground, Direction } from 'react-range';

const STEP = 1;
const MIN = 2013;
const MAX = 2018;

class RangeYears extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            values: [2018]
        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(values) {
        this.setState({ values });
    }

    componentDidMount() {

    }

    render() {

        return (

            <div>

                <div className="uk-margin-medium-bottom uk-text-center">
                    <span className="uk-label uk-label-primary">Year: {this.state.values[0].toFixed(0)}</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '300px',
                        flexDirection: 'column'
                    }}
                >
                    <Range
                        direction={Direction.Up}
                        values={this.state.values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={values => this.setState({ values })}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    flexGrow: 1,
                                    width: '32px',
                                    marginLeft: '32px',
                                    display: 'flex',
                                    height: '300px'
                                }}
                            >
                            <div
                                ref={props.ref}
                                style={{
                                    width: '3px',
                                    height: '300px',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values: this.state.values,
                                        colors: ['rgb(51,102,0)', '#ccc'],
                                        min: MIN,
                                        max: MAX,
                                        direction: Direction.Up
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '32px',
                                width: '32px',
                                borderRadius: '1px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 4px #AAA'
                            }}
                            >
                            <div
                                style={{
                                    width: '16px',
                                    height: '3px',
                                    backgroundColor: isDragged ? 'rgb(51,102,0)' : '#CCC'
                                }}
                            />
                        </div>
                    )}
                    />
                </div>

                <div className="uk-margin-top uk-text-center uk-text-small">
                    Mining Hardware Production Standard
                </div>

            </div>

        )
    }
}

export default RangeYears;
