import React, {Component} from 'react'
import { Range, getTrackBackground, Direction } from 'react-range'

class RangeYears extends Component {
    state = {
        values: [2013],
    }
    constructor(...props) {

        super(...props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(selectedYearValues) {
        this.setState({ selectedYearValues, values: [50]});
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

            <div uk-grid="" className="uk-margin-top">

                <div className="uk-width-1-1">
                    <span className="uk-text-small uk-text-muted">
                        Mining Hardware Production Standard
                    </span>
                    <br />
                    <span className="uk-label uk-label-primary">
                        Year: { selectedYearValues[0] }
                    </span>
                </div>

                <div className="uk-width-expand"
                    style={{
                        // display: "flex",
                        // justifyContent: "center",
                        // flexWrap: "wrap",
                        // paddingLeft:'30px',
                        // paddingRight:'30px'
                    }}
                >
                    <Range
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
                                    width: '100%',
                                    display: 'flex',
                                    height: '36px'
                                }}
                            >
                            <div
                                ref={props.ref}
                                style={{
                                    width: '100%',
                                    height: '3px',
                                    borderRadius: '0',
                                    background: getTrackBackground({
                                        values: selectedYearValues,
                                        colors: ['rgb(51,102,0)', '#ccc'],
                                        min: MIN,
                                        max: MAX,
                                        // direction: Direction.Right
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
                        }}>
                            <div
                            style={{
                                width: '3px',
                                height: '16px',
                                backgroundColor: isDragged ? 'rgb(51,102,0)' : '#CCC'
                            }}/>
                        </div>
                    )}
                    />
                </div>

            </div>

        )
    }
}

export default RangeYears;
