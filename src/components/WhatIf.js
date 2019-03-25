import React, {Component} from 'react';
// import gamificationmap from './images/carbonara_gamificationmap.png';

import WorldMap from './WorldMap';
import RangeYears from './RangeYears';
import RangeRegions from './RangeRegions';
import RegionRatio from './RegionRatio';

class WhatIf extends Component {

    constructor(...props) {

        super(...props)
        this.handleRegionsChange = this.handleRegionsChange.bind(this)
        this.setEmissionsPercent = this.setEmissionsPercent.bind(this)
        this.setRegionCodes = this.setRegionCodes.bind(this)
        this.setRegionButtons = this.setRegionButtons.bind(this)
        this.setRatioToRegions = this.setRatioToRegions.bind(this)
        this.calculateValuesRatio = this.calculateValuesRatio.bind(this)
        this.getRatio = this.getRatio.bind(this)
        this.getRegions = this.getRegions.bind(this)
        this.state = {
            emissionsPercent: [],
            regionButtons: [],
            regionCodes: RegionRatio
        }

    }

    calculateValuesRatio() {
        return this.state.emissionsPercent
    }

    setRatioToRegions() {
        let regionCodes = this.state.regionCodes;
        let self = this;
        regionCodes.forEach(function(v, k){
            v.amount = self.calculateValuesRatio()[k];
        });
        this.setState({ regregionCodesions });
    }

    getRatio() {
        let regionButtons = this.state.regionButtons;
        let emissionsPercent = this.state.emissionsPercent;
        this.setState({ emissionsPercent, regionButtons });
        this.setRatioToRegions()
        return this.calculateValuesRatio();
    }

    getRegions() {
        this.setRatioToRegions();
        return this.state.regionCodes;
    }

    handleRegionsChange(regionButtons) {
        this.setState({ regionButtons });
    }

    setEmissionsPercent() {
        let emissionsSum = 0
        this.props.emissions.forEach(function(v,k){
            emissionsSum += Number(v)
        })

        let emissionsPercent = []
        this.props.emissions.forEach(function(v,k){
            emissionsPercent.push(Number(v) / emissionsSum * 100)
        })
        this.setState({ emissionsPercent })
    }

    setRegionCodes() {
        this.setState({ regionCodes: this.props.regions })
    }

    setRegionButtons() {
        let regionButtons = []
        let emissionsSum = 0
        this.props.emissions.forEach(function(v,k){
            emissionsSum += Number(v)
            regionButtons.push(emissionsSum)
        })
        regionButtons.pop()
        this.setState({ regionButtons })

    }

    componentDidMount() {
        // this.setRatioToRegions()
        this.setEmissionsPercent()
        this.setRegionCodes()
        this.setRegionButtons()
    }

    render() {

        const years = this.props.years.sort()
        const lastyear = years[years.length - 1]

        return (
            <section className="uk-section uk-section-default">
                <div className="uk-container">
                    <h2><span uk-icon="icon: world; ratio: 2" className="uk-margin-right"></span> What if &hellip;</h2>
                    <div uk-grid="" className="">
                        <div className="uk-width-5-6">
                            <WorldMap emissionsPercent={this.state.emissionsPercent} />
                            {this.state.regionButtons}
                            <RangeRegions onRegionsChange={this.handleRegionsChange} regionButtons={this.state.regionButtons} regionCodes={this.state.regionCodes} emissionsPercent={this.state.emissionsPercent} />
                        </div>
                        <div className="uk-width-1-6">
                            <RangeYears years={years} values={[lastyear]} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default WhatIf;
