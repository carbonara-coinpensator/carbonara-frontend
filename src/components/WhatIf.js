import React, {Component} from 'react'
import WorldMap from './WorldMap'
import RangeYears from './RangeYears'
import RangeRegions from './RangeRegions'

class WhatIf extends Component {

    constructor(...props) {

        super(...props)

        this.calculateConsumptionsSum = this.calculateConsumptionsSum.bind(this)
        this.calculateConsumptionsPercentFromProps = this.calculateConsumptionsPercentFromProps.bind(this)
        this.calculateConsumptionsPercentFromRegionButtons = this.calculateConsumptionsPercentFromRegionButtons.bind(this)
        this.calculateRegionButtons = this.calculateRegionButtons.bind(this)
        this.handleRegionsChange = this.handleRegionsChange.bind(this)
        this.handleYearsChange = this.handleYearsChange.bind(this)

        this.state = {
            consumptions: this.props.consumptions,
            consumptionsSum: this.calculateConsumptionsSum(),
            consumptionsPercent: this.calculateConsumptionsPercentFromProps(),
            regionButtons: this.calculateRegionButtons(),
            regionCodes: this.props.regions,
            selectedYearValue: this.props.transactionYear
        }

    }

    // calculate the sum of all consumptions given in props
    calculateConsumptionsSum() {

        let consumptionsSum = 0

        this.props.consumptions.forEach(function(v,k){
            consumptionsSum += Number(v)
        })

        return consumptionsSum

    }

    // calculate percentage values of consumptions
    // based on consumptions props
    calculateConsumptionsPercentFromProps() {
        
        let consumptionsPercent = []
        let consumptionsSum = this.calculateConsumptionsSum()
        
        this.props.consumptions.forEach(function(v){
            consumptionsPercent.push(Number(v) / consumptionsSum * 100)
        })

        return consumptionsPercent

    }

    // calculate percentage values of consumptions
    // based on regionButtons (set via handleRegionsChange from child component)
    calculateConsumptionsPercentFromRegionButtons(regionButtons) {

        let consumptionsPercent = []
        let thisNumber = 0;

        // calculate percentage of track area controlled by button
        regionButtons.forEach(function(v){
            let lastNumber = thisNumber
            thisNumber = v
            consumptionsPercent.push(thisNumber - lastNumber)
        })

        // add a last value to complete 100% of track area
        consumptionsPercent.push(100 - thisNumber)

        // update state
        this.setState({ consumptionsPercent })

        return consumptionsPercent

    }

    // child component sends regionButtons array here
    handleRegionsChange(regionButtons) {
        // set state
        this.setState({ regionButtons })
        // set consumptions percentages based on button values
        this.calculateConsumptionsPercentFromRegionButtons(regionButtons)
        // this.props.onRegionsChange(regionButtons)
    }

    handleYearsChange(selectedYearValue) {
        this.setState({ selectedYearValue })
        this.props.onYearsChange(selectedYearValue)
    }

    // set regionButtons positions based on consumptions prop values
    calculateRegionButtons() {

        let consumptionsSum = this.calculateConsumptionsSum()

        // array for region buttons
        let regionButtons = []

        // every buttons adds up the value of previous button
        let consumptionsAddPercent = 0

        this.props.consumptions.forEach(function(v,k){
            consumptionsAddPercent += Number(v) / consumptionsSum * 100
            regionButtons.push(consumptionsAddPercent)
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

        return (
            <div>
                <div uk-grid="" className="">
                    <div className="uk-width-5-6">
                        <WorldMap consumptionsPercent={this.state.consumptionsPercent} />
                        <RangeRegions onRegionsChange={this.handleRegionsChange} regionButtons={this.state.regionButtons} regionCodes={this.state.regionCodes} consumptionsPercent={this.state.consumptionsPercent} />
                    </div>
                    <div className="uk-width-1-6">
                        <RangeYears onYearsChange={this.handleYearsChange} years={years} selectedYearValues={[this.state.selectedYearValue]} />
                    </div>
                </div>
            </div>
        )
    }
}

export default WhatIf;
