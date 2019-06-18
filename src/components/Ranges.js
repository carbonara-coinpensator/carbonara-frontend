import React, {Component} from 'react'
import { Range, getTrackBackground } from 'react-range'
import RegionInfos from './RegionInfos'

const STEP = 1
const MIN = 0
const MAX = 100

class Ranges extends Component {

    constructor(...props) {

        super(...props)
        this.onChange = this.onChange.bind(this)
        this.onChangePercentageValue = this.onChangePercentageValue.bind(this)
        this.state = {
            regionButtons: this.props.regionButtons,
            colors: [],
            consumptionsPercent: this.props.consumptionsPercent
        }

    }

    onChange(regionButtons) {
        this.setState({ regionButtons })
        this.props.onRegionsChange(regionButtons)
    }

    onChangePercentageValue(consumption, index) {
        this.props.onRegionsPercentChange(consumption[0], index)
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

        const colors = this.state.colors

        const renderTrack = ({ props, children }) => (
            <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
                ...props.style,
                height: '32px',
                display: 'flex',
                width: '100%'
            }}>
                <div
                ref={props.ref}
                style={{
                    height: '3px',
                    width: '100%',
                    borderRadius: '0',
                    background: '#ddd',
                    alignSelf: 'center'
                }}>
                    {children}
                </div>
            </div>
        )

        const renderThumb = ({ props, isDragged, index }) => (
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
            }}>
                <div
                style={{
                height: '12px',
                width: '3px',
                backgroundColor: isDragged ? colors[index] : '#CCC'
                }}
                />
            </div>
        )

        const self = this
        const ranges = []

        this.props.consumptionsPercent.forEach(function(v,k) {
            ranges.push(
                <div
                key={k}
                uk-grid=""
                className="uk-margin-small-top">
                    <div className="uk-width-1-3 uk-width-1-4@s uk-with-1-5@m uk-width-1-6@l uk-text-right">
                        <span
                        className="uk-label"
                        style={{ backgroundColor: colors[k] }}>
                            {RegionInfos[k].fullname}: {v.toFixed(0)}%
                        </span>
                    </div>
                    <div className="uk-width-2-3 uk-width-3-4@s uk-with-4-5@m uk-width-5-6@l">
                        <Range
                        values={[v]}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(v) => self.onChangePercentageValue( v, k )}
                        renderTrack={renderTrack}
                        renderThumb={renderThumb}
                        />
                    </div>
                </div>
            )
        })

        return (

            <div className="uk-margin-large-right">
                {ranges}
            </div>

        )
    }
}

export default Ranges;
