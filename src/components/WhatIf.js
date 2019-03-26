import React, {Component} from 'react'
import WorldMap from './WorldMap'
import RangeYears from './RangeYears'
import RangeRegions from './RangeRegions'

class WhatIf extends Component {

    constructor(...props) {

        super(...props)

        this.calculateEmissionsSum = this.calculateEmissionsSum.bind(this)
        this.calculateEmissionsPercentFromProps = this.calculateEmissionsPercentFromProps.bind(this)
        this.calculateEmissionsPercentFromRegionButtons = this.calculateEmissionsPercentFromRegionButtons.bind(this)
        this.calculateRegionButtons = this.calculateRegionButtons.bind(this)
        this.handleRegionsChange = this.handleRegionsChange.bind(this)
        this.handleYearsChange = this.handleYearsChange.bind(this)

        this.state = {
            emissions: this.props.emissions,
            emissionsSum: this.calculateEmissionsSum(),
            emissionsPercent: this.calculateEmissionsPercentFromProps(),
            regionButtons: this.calculateRegionButtons(),
            regionCodes: this.props.regions,
            selectedYearValues: [this.props.years.sort()[this.props.years.length - 1]]
        }

    }

    // calculate the sum of all emissions given in props
    calculateEmissionsSum() {

        let emissionsSum = 0

        this.props.emissions.forEach(function(v,k){
            emissionsSum += Number(v)
        })

        return emissionsSum

    }

    // calculate percentage values of emissions
    // based on emissions props
    calculateEmissionsPercentFromProps(regionButtons) {

        let emissionsPercent = []
        let emissionsSum = this.calculateEmissionsSum()

        this.props.emissions.forEach(function(v,k){
            emissionsPercent.push(Number(v) / emissionsSum * 100)
        })

        return emissionsPercent

    }

    // calculate percentage values of emissions
    // based on regionButtons (set via handleRegionsChange from child component)
    calculateEmissionsPercentFromRegionButtons(regionButtons) {

        let emissionsSum = this.state.emissionsSum
        let emissionsPercent = []
        let thisNumber = 0;

        // calculate percentage of track area controlled by button
        regionButtons.forEach(function(v,k){
            let lastNumber = thisNumber
            thisNumber = Number(v) / emissionsSum * 100
            emissionsPercent.push(thisNumber - lastNumber)
        })

        // add a last value to complete 100% of track area
        emissionsPercent.push(100 - thisNumber)

        // update state
        this.setState({ emissionsPercent })

        return emissionsPercent

    }

    // child component sends regionButtons array here
    handleRegionsChange(regionButtons) {
        // set state
        this.setState({ regionButtons })
        // set emission percentages based on button values
        this.calculateEmissionsPercentFromRegionButtons(regionButtons)
        this.props.onWhatifChange()
    }

    handleYearsChange(selectedYearValues) {
        this.setState({ selectedYearValues })
        this.props.onWhatifChange()
    }

    // set regionButtons positions based on emissions prop values
    calculateRegionButtons() {

        // array for region buttons
        let regionButtons = []

        // every buttons adds up the value of previous button
        let emissionsAdd = 0
        this.props.emissions.forEach(function(v,k){
            emissionsAdd += Number(v)
            regionButtons.push(emissionsAdd)
        })

        // last button does not exist (since we have 1 button less than percent values which are controlled by them)
        regionButtons.pop()

        // set buttons
        return regionButtons

    }

    componentDidMount() {

    }

    render() {

        const years = this.props.years.sort()
        const selectedYearValues = this.state.selectedYearValues

        return (
            <div>
                <div uk-grid="" className="">
                    <div className="uk-width-5-6">
                        <WorldMap emissionsPercent={this.state.emissionsPercent} />
                        <RangeRegions onRegionsChange={this.handleRegionsChange} regionButtons={this.state.regionButtons} regionCodes={this.state.regionCodes} emissionsPercent={this.state.emissionsPercent} />
                    </div>
                    <div className="uk-width-1-6">
                        <RangeYears onYearsChange={this.handleYearsChange} years={years} selectedYearValues={selectedYearValues} />
                    </div>
                </div>
            </div>
        )
    }
}

export default WhatIf;
