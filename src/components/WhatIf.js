import React, {Component} from 'react'
import WorldMap from './WorldMap'
import RangeYears from './RangeYears'
import RangeRegions from './RangeRegions'
import Ranges from './Ranges'

class WhatIf extends Component {

    constructor(...props) {

        super(...props)

        this.calculateConsumptionsSum = this.calculateConsumptionsSum.bind(this)
        this.calculateConsumptionsPercentFromProps = this.calculateConsumptionsPercentFromProps.bind(this)
        this.calculateConsumptionsPercentFromRegionButtons = this.calculateConsumptionsPercentFromRegionButtons.bind(this)
        this.calculateRegionButtons = this.calculateRegionButtons.bind(this)
        this.handleRegionsChange = this.handleRegionsChange.bind(this)
        this.handleRegionsPercentChange = this.handleRegionsPercentChange.bind(this)
        this.handleYearsChange = this.handleYearsChange.bind(this)

        this.state = {
            consumptions: this.props.consumptions,
            consumptionsSum: this.calculateConsumptionsSum(),
            consumptionsPercent: this.calculateConsumptionsPercentFromProps(),
            regionButtons: this.calculateRegionButtons(),
            regionCodes: this.props.regions,
            selectedYearValue: this.props.transactionYear,
            biggest: 100
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
        this.props.onRegionsChange(regionButtons)
    }

    handleRegionsPercentChange(changedValue, changedIndex) {

        // all percentage values available in state
        var consumptionsPercent = this.state.consumptionsPercent

        // new value obtained from slider input
        var changedValue = changedValue

        // index of consumptionsPercent value that is being changed
        var changedIndex = changedIndex

        // difference of new and original value
        var difference = changedValue - consumptionsPercent[changedIndex]

        ////////////////////////
        // calculate subtraction params: round 1
        ////

        // all other percentage values will be changed by a proportion
        var singleSubtractionValue = difference / (consumptionsPercent.length - 1)

        // store keys of percentage values which can be changed
        var subtractionids = []

        // loop through state values
        consumptionsPercent.forEach(function(v,k){
            // exclude input value
            if (k !== changedIndex) {
                // if new value will get bigger than 0% and smaller than 100%, add id to subtraction list
                if ((v - singleSubtractionValue > 0) && (v - singleSubtractionValue < 100)) {
                    subtractionids.push(k)
                }
            }
        })

        ////////////////////////

        ////////////////////////
        // calculate subtraction params: round 2
        // sinces subtraction portion could have been changed in round 1
        ////

        // define percentage proportion again
        var singleSubtractionValue = difference / subtractionids.length

        // make a new list
        var newsubtractionids = []

        // full list with valid proportion values
        subtractionids.forEach(function(v){
            // if value gets bigger than 0% and smaller than 100%, add id to new subtraction list
            if ((consumptionsPercent[v] - singleSubtractionValue > 0) && (consumptionsPercent[v] - singleSubtractionValue < 100)) {
                newsubtractionids.push(v)
            }
        })

        ////////////////////////

        // start adding to 100%
        let addToHundredPercent = changedValue

        // do subtraction to other valid percentage values
        newsubtractionids.forEach(function(v){
            // new percentage value
            let newVal = consumptionsPercent[v] - singleSubtractionValue
            // will the addition of this value
            // to the sum of all other values so far
            // exceed 100%?
            if (addToHundredPercent + newVal > 100) {
                // set this value as difference from sum to 100
                consumptionsPercent[v] = 100 - addToHundredPercent
                addToHundredPercent = 100
            } else {
                // set this value
                consumptionsPercent[v] = newVal
                // update values sum
                addToHundredPercent = Math.round(addToHundredPercent + newVal)
            }
        })

        // sum is not 100%?
        // fix sum due to rounding errors
        if (addToHundredPercent < 100) {
            // calculate diff
            let diff = 100 - addToHundredPercent
            // set sum to 100
            addToHundredPercent = 100
            // add diff to last val
            newsubtractionids[newsubtractionids.length - 1] += diff
        }

        // set new value
        consumptionsPercent[changedIndex] = changedValue

        // set percentages in app state
        this.setState({
            consumptionsPercent
        })

        this.props.onPercentagesChange(consumptionsPercent)

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
            <div className="uk-margin-large-bottom">
                <WorldMap consumptionsPercent={this.state.consumptionsPercent} />
                {/*<RangeRegions onRegionsChange={this.handleRegionsChange} regionButtons={this.state.regionButtons} regionCodes={this.state.regionCodes} consumptionsPercent={this.state.consumptionsPercent} />*/}
                <Ranges onRegionsPercentChange={this.handleRegionsPercentChange} regionButtons={this.state.regionButtons} regionCodes={this.state.regionCodes} consumptionsPercent={this.state.consumptionsPercent} />
                <RangeYears onYearsChange={this.handleYearsChange} years={years} selectedYearValues={[this.state.selectedYearValue]} />
            </div>
        )
    }
}

export default WhatIf;
