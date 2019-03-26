import React, {Component} from 'react'
import { Range, getTrackBackground, Direction } from 'react-range'

class RangeYears extends Component {

    constructor(...props) {

        super(...props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            selectedYearValues: this.props.selectedYearValues,
        }

    }

    onChange(selectedYearValues) {
        this.setState({ selectedYearValues });
        this.props.onYearsChange(selectedYearValues);
    }

    componentDidMount() {

    }

    render() {

        let years = this.props.years
        let selectedYearValues = this.props.selectedYearValues

        const MIN = Number(years[0])
        const MAX = Number(years[years.length - 1])
        const STEP = 1

        return (

            <div>

                <div className="uk-margin-medium-bottom uk-text-center">
                    <span className="uk-label uk-label-primary">Year: { selectedYearValues[0] }</span>
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
                        values={selectedYearValues}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={selectedYearValues => this.onChange( selectedYearValues )}
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
                                        values: selectedYearValues,
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
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 4px #999'
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
