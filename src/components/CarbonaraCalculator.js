import React, { Component } from 'react'
import 'react-dates/initialize'
import { Link, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import MaterialTable from 'material-table'
import moment from 'moment'
import API from '../api'
import ResultGrid from './ResultGrid'
import ResultSection from './ResultSection'
import Navigation from './Navigation'
import ConsumptionGraph from './ConsumptionGraph'
import WhatIf from './WhatIf'
import zuehlke from '../static/media/zuehlke.png'
import unibright from '../static/media/unibright.png'
import ethevents from '../static/media/ethevents.png'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../scss/css.scss'

UIkit.use(Icons);

class CarbonaraCalculator extends Component {

    constructor(...props) {

        super(...props)
        this.handleChange = this.handleChange.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForms = this.validateForms.bind(this)
        this.validateWalletForm = this.validateWalletForm.bind(this)
        this.validateTransactionForm = this.validateTransactionForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.getTransactions = this.getTransactions.bind(this)
        this.getEmissions = this.getEmissions.bind(this)
        this.getYears = this.getYears.bind(this)
        this.getConsumptionPerRegion = this.getConsumptionPerRegion.bind(this)
        this.fillInTransactionIdAndEmptyTransactionsList = this.fillInTransactionIdAndEmptyTransactionsList.bind(this)
        this.getChartData = this.getChartData.bind(this)
        this.handleYearsChange = this.handleYearsChange.bind(this)
        this.handleRegionsChange = this.handleRegionsChange.bind(this)
        this.calculateGamificationForYear = this.calculateGamificationForYear.bind(this)
        this.calculateGamificationForRegions = this.calculateGamificationForRegions.bind(this)

        this.state = {

            chart: {},

            address: '',

            addressValidity: {
                wallet: false,
                transaction: false,
                some: false
            },

            formValidity: {
                wallet: false,
                transaction: false
            },

            transactions: [],
            transactionTime: 0,
            transactionYearEstimated: 0,

            years: [],
            regions: [],
            consumptionPerRegion: [],
            regionRanges: [],

            focusedInput: null,
            emissionsResult: 0,

            showGamificationResults: false,
            gamificationResult: 0,

            mainCalculationResult: {}

        }

    }




    /**
     * FORM HANDLING
     */

    validateField(fieldName, value) {
        let walletAddressValid = this.state.addressValidity.wallet
        let transactionIdValid = this.state.addressValidity.transaction
        switch(fieldName) {
            case 'address':
                walletAddressValid = value.length === 34;
                transactionIdValid = value.length === 64;
                break
            default:
                break
        }
        this.setState({
            addressValidity: {
                wallet: walletAddressValid,
                transaction: transactionIdValid,
                some: (walletAddressValid || transactionIdValid)
            }

        }, () => this.validateForms())
    }

    validateForms() {
        if (this.state.addressValidity.wallet) {
            this.validateWalletForm()
        }
        if (this.state.addressValidity.transaction) {
            this.validateTransactionForm()
        }
    }

    validateWalletForm() {
        let walletFormValid = this.state.addressValidity.wallet
        this.setState({ formValidity: { wallet: walletFormValid } })
    }

    validateTransactionForm() {
        let transactionFormValid = this.state.addressValidity.transaction
        this.setState({ formValidity: { transaction: transactionFormValid } })
    }

    fillInTransactionIdAndEmptyTransactionsList(e, transaction) {
        e.preventDefault();
        this.handleChange(e);
        this.setState({
            addressValidity: {
                wallet: false,
                transaction: true,
                some: true
            },
            address: transaction.txid,
            transactionTime: transaction.time,
            transactions: []
         })
    }

    submitForm(e) {
        e.preventDefault()
        if (this.state.addressValidity.wallet) {
            this.getTransactions()
        }
        if (this.state.addressValidity.transaction) {
            this.getEmissions()
            // this.resetForm()
        }
    }

    resetForm() {
        this.setState({
            address: '',
            addressValidity: {
                wallet: false,
                transaction: false,
                some: false
            },
            formValidity: {
                wallet: false,
                transaction: false
            }
        })
    }



    /**
     * API CALLS
     */

    getChartData() {
        UIkit.notification('<div uk-spinner=""></div> Getting chart data …', {status: 'primary'})
        API.get('api/Carbonara/Charts').then(res => {
            this.setState({ chart: res.data });
            UIkit.notification.closeAll()
        });
    }

    getTransactions(e) {
        UIkit.notification('<div uk-spinner=""></div> Getting transactions …', {status: 'primary'})
        API.get('api/Carbonara/TransactionList?BitcoinAddress=' + this.state.address).then(res => {
            res.data.forEach(function(v,k){
                v.time = moment.unix(v.time).format()
            })
            this.setState({ transactions: res.data })
            UIkit.notification.closeAll()
        })
    }

    getEmissions() {

        this.resetCalculations()
        this.setTransactionYearEstimated()

        UIkit.notification('<div uk-spinner=""></div> Calculating emissions …', {status: 'primary'})
        API.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(res => {

            // set main result
            this.setState({ mainCalculationResult: res.data })

            // set various state vars based on mainCalculationResult state
            this.setState({
                consumptionPerRegion: this.getConsumptionPerRegion(),
                regionRanges: this.getConsumptionPerRegion(),
                regions: this.getRegions(),
                years: this.getYears()
            })

            // main emission result
            this.setState({
                emissionsResult: this.state.mainCalculationResult.calculationPerYear[this.state.transactionYearEstimated].fullCo2EmissionInKg
            })

        }).catch(function (error) {
            console.log(error);
        })
        .then(function () {
            UIkit.notification.closeAll()
            // UIkit.scroll('#results').scrollTo('#results')
            scroller.scrollTo('results', {
                spy: true,
                smooth: true,
                duration: 500
            })
        })
    }




    /**
     * GETTERS (from state)
     */

    getYears() {
        let years = []
        // make a list of years available for gamification out of keys in response calculationPerYear object
        Object.keys(this.state.mainCalculationResult.calculationPerYear).map((k) => (
            years.push(k)
        ))
        return years
    }

    getRegions() {
        // obtained region codes are used for gamification in WhatIf component
        let regions = []
        this.state.mainCalculationResult.calculationPerYear[this.state.transactionYearEstimated].energyConsumptionPerCountryInKWh.forEach(function(v){
            // push properties to arrays
            regions.push(v.countryCode)
        })
        return regions
    }

    getConsumptionPerRegion() {
        // consumption per region is used for gamification in WhatIf component
        let consumptionPerRegion = []
        // given average emissions per region
        this.state.mainCalculationResult.calculationPerYear[this.state.transactionYearEstimated].energyConsumptionPerCountryInKWh.forEach(function(v){
            // push properties to arrays
            consumptionPerRegion.push(v.energyConsumptionInKWh)
        })
        return consumptionPerRegion
    }



    /**
     * SETTERS (to state)
     */

    setTransactionYearEstimated() {
        // get transaction time or now
        let transactionTime = this.state.transactionTime ? this.state.transactionTime : moment()
        // get year before transaction time
        let transactionYearEstimated = moment(transactionTime).subtract(1, 'years').year()
        this.setState({ transactionYearEstimated })
    }




    /**
     * CALCULATIONS
     */

    calculateTotalEnergyConsumptionForYear(year) {
        let sum = 0
        this.state.mainCalculationResult.calculationPerYear[year].energyConsumptionPerCountryInKWh.forEach(function(v){
            sum += v.energyConsumptionInKWh
        })
        return sum
    }

    calculateRegionPercentagePositionsFromConsumptionValues() {
        let totalEnergyConsumptionInCurrentYear = this.calculateTotalEnergyConsumptionForYear(this.state.transactionYearEstimated)
        let regionsPercentagePositions = []
        let lastPercentagePosition = 0
        this.state.regionRanges.forEach(function(v){
            lastPercentagePosition += v.energyConsumptionInKWh
            regionsPercentagePositions.push(lastPercentagePosition/totalEnergyConsumptionInCurrentYear*100)
        })
        regionsPercentagePositions.pop()
        return regionsPercentagePositions
    }

    calculateGamificationForYear() {
        this.calculateGamificationForRegions()
    }

    calculateGamificationForRegions() {

        // let regionsPercentagePositions = this.calculateRegionPercentagePositionsFromConsumptionValues()
        let regionsPercentagePositions = this.state.regionRanges

        // add last percentage value to positions
        if (regionsPercentagePositions.length < this.state.mainCalculationResult.averageCo2EmissionPerCountryInKg.length) {
            regionsPercentagePositions.push(100)
        }

        // calculate single percentage values out of region slider positions
        let regionsPercentages = []
        let lastPercentageValue = 0
        regionsPercentagePositions.forEach(function(v){
            // add up percentage values
            regionsPercentages.push(v - lastPercentageValue)
            lastPercentageValue = v
        })

        // calculate sum of energy consumption of all countries in current year
        let totalEnergyConsumptionInCurrentYear = this.calculateTotalEnergyConsumptionForYear(this.state.transactionYearEstimated)

        // calculate new values from new percentages
        let newEnergyConsumptionsPerCountry = []
        regionsPercentages.forEach(function(v){
            newEnergyConsumptionsPerCountry.push(v * totalEnergyConsumptionInCurrentYear / 100)
        })

        // calculate full emission with formula (averageCo2EmissionPerCountryInKg.Co2Emission / 1000) * energyConsumptionPerCountryInKWh.EnergyConsumption
        let gamificationResult = 0
        this.state.mainCalculationResult.averageCo2EmissionPerCountryInKg.forEach(function(v,k){
            gamificationResult += v.co2EmissionInKg / 1000 * newEnergyConsumptionsPerCountry[k]
        })

        regionsPercentagePositions.pop()

        // set state
        this.setState({
            gamificationResult: gamificationResult,
            consumptionPerRegion: newEnergyConsumptionsPerCountry
        })

    }

    resetCalculations() {
        this.setState({
            transactionTime: 0,
            transactionYearEstimated: 0,
            years: [],
            regions: [],
            consumptionPerRegion: [],
            focusedInput: null,
            emissionsResult: 0,
            showGamificationResults: false,
            gamificationResult: 0,
            mainCalculationResult: {}
        })
    }



    /**
     * HANDLERS
     */

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState(
            {[name]: value},
            () => {this.validateField(name, value)}
        )
    }

    handleRegionsChange(regions) {
        this.setState({
            showGamificationResults: true,
            regionRanges: regions
        })
        this.calculateGamificationForRegions()
    }

    handleYearsChange(year) {
        this.setState({
            showGamificationResults: true,
            transactionYearEstimated: year[0]
        })
        this.calculateGamificationForYear()
    }

    handleInputFocus() {
        UIkit.scrollspy('#address', { repeat: true })
        UIkit.util.on('#address', 'inview', function () {
            this.focus()
        })
    }




    componentDidMount() {
        this.getChartData()
        this.handleInputFocus()
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }



    render() {

        let showTransactions = this.state.transactions.length > 0 && this.state.formValidity.wallet
        let showResults = this.state.emissionsResult > 0
        let showGamification = this.state.years.length > 0 && this.state.regions.length > 0 && this.state.consumptionPerRegion.length > 0
        let showGamificationResults = this.state.showGamificationResults

        return (
            <div className="uk-text-center">

                <div className="background-landscape">
                    <section id="welcome" className="uk-section uk-section-default uk-text-center uk-flex uk-flex-middle uk-position-relative uk-height-viewport">
                        <Navigation />
                        <div className="uk-width-1-1">
                            <div className="uk-container uk-container-small uk-margin-large-bottom" uk-scrollspy="cls: uk-animation-fade; repeat: true">
                                <h1>Carbonara Coinpensator</h1>
                                <p>The Carbonara Coinpensator (#Carbonara) is a blockchain related open-source project, established by Unibright and Zühlke Engineering. The main goal of the project is to raise awareness of energy consumption of public blockchains.</p>
                                <p>To motivate the personal examination of the topic, #Carbonara enables the calculation of consumed energy of personal blockchain transactions. Depending on different factors like given hashrate by the time of transaction, mining time and contributing energy sources, #Carbonara proposes an approximated carbon dioxide amount to be compensated in green energy projects.</p>
                                <div className="uk-margin-medium-top uk-text-small">
                                    <p>Powered by</p>
                                    <div uk-grid="" className="uk-flex-center uk-animation-fast">
                                        <div uk-scrollspy="cls: uk-animation-slide-right-small; repeat: true; delay: 350">
                                            <a href="https://unibright.io" target="zuehlke" className="uk-animation-toggle">
                                                <div className="uk-inline-clip uk-transition-toggle uk-dark" tabIndex="0">
                                                    <img src={unibright} alt="" />
                                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
                                                        <div className="uk-position-center">
                                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div uk-scrollspy="cls: uk-animation-slide-left-small; repeat: true; delay: 450">
                                            <a href="https://www.zuehlke.com" target="zuehlke" className="uk-animation-toggle">
                                                <div className="uk-inline-clip uk-transition-toggle uk-dark" tabIndex="0">
                                                    <img src={zuehlke} alt="" />
                                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
                                                        <div className="uk-position-center">
                                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div uk-scrollspy="cls: uk-animation-slide-left-small; repeat: true; delay: 550">
                                            <a href="https://eth.events/" target="zuehlke" className="uk-animation-toggle">
                                                <div className="uk-inline-clip uk-transition-toggle uk-dark" tabIndex="0">
                                                    <img src={ethevents} alt="" />
                                                    <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
                                                        <div className="uk-position-center">
                                                            <span className="uk-transition-fade" uk-icon="icon: link; ratio: 2"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-position-bottom" uk-scrollspy="cls: uk-animation-slide-bottom-small; repeat: true">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <Link className="uk-button uk-button-primary" to="graph" spy={true} smooth={true} duration={500}>
                                            BTC Price and Energy Consumption <span uk-icon="arrow-down"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                { 'priceChart' in this.state.chart && 'energyConsumptionChart' in this.state.chart &&
                    <section id="graph" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default">
                        <div className="uk-width-1-1">
                            <div className="uk-container" uk-scrollspy="cls: uk-animation-fade; repeat: true">
                                <h2 className="uk-text-center">BTC Price and Energy Consumption</h2>
                                <ConsumptionGraph className="uk-margin-top"  prices={this.state.chart.priceChart} consumptions={this.state.chart.energyConsumptionChart} />
                            </div>
                            <div className="uk-position-bottom" uk-scrollspy="cls: uk-animation-slide-bottom-small; repeat: true">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <Link className="uk-button uk-button-primary" to="calculate" spy={true} smooth={true} duration={500}>
                                            How green is my BTC Wallet? <span uk-icon="arrow-down"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                <section id="calculate" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary">
                    <div className="uk-width-1-1">
                            <div className="uk-container" uk-scrollspy="cls: uk-animation-fade; repeat: true">

                                <h2>How <strong>green</strong> is my BTC Wallet?</h2>

                                <form onSubmit={this.submitForm} className="uk-margin-large-top">

                                    <div className="uk-text-small uk-child-width-1-2 uk-margin-medium" uk-grid="">
                                        <p>Example Wallet Address: <br /><code>1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC</code></p>
                                        <p>Example Transaction ID: <br /><code>e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8</code></p>
                                    </div>

                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="address">Wallet Address or Transaction ID</label>
                                        <div className="uk-form-controls">
                                            <input className="uk-input uk-form-large uk-text-center"
                                                id="address"
                                                type="text"
                                                name="address"
                                                placeholder="Wallet Address or Transaction ID"
                                                value={this.state.address}
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            <button type="submit" className={'uk-margin-top uk-button uk-button-large' + (!this.state.addressValidity.some ? ' uk-button-default uk-invisible' : ' uk-button-primary')} disabled={!this.state.addressValidity.some}>
                                                { this.state.addressValidity.wallet ? 'Get transactions' : this.state.addressValidity.transaction ? 'Calculate' : '' }
                                            </button>
                                        </div>
                                    </div>
                                    <div uk-grid="">

                                        {/*<div className="uk-width-1-3">
                                            { this.state.transactionIdValid &&
                                                <div>
                                                    <label className="uk-form-label">Please pick a date range</label>
                                                    <br />
                                                    <DateRangePicker
                                                        startDateId="startDate"
                                                        endDateId="endDate"
                                                        startDate={this.state.startDate}
                                                        endDate={this.state.endDate}
                                                        onDatesChange={({ startDate, endDate }) => { this.onChangeDateRange( startDate, endDate )}}
                                                        focusedInput={this.state.focusedInput}
                                                        onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                                                        showClearDates={true}
                                                        showDefaultInputIcon={true}
                                                        verticalSpacing={0}
                                                        firstDayOfWeek={1}
                                                        hideKeyboardShortcutsPanel={true}
                                                        transitionDuration={100}
                                                        displayFormat="YYYY-MM-DD"
                                                    />
                                                </div>
                                            }
                                        </div>*/}

                                        <div className="uk-width-1-1">

                                            { showTransactions &&
                                                <div uk-scrollspy="cls: uk-animation-fade; repeat: true">
                                                    <label className="uk-form-label">Please select a transaction</label>
                                                    <br />
                                                    <MaterialTable
                                                        columns={[
                                                            { title: 'time', field: 'time', defaultSort: 'desc' },
                                                            { title: 'txid', field: 'txid' },
                                                            { title: 'value', field: 'value', type: 'numeric' },
                                                        ]}
                                                        data={this.state.transactions}
                                                        options={{ pageSize: 5 }}
                                                        title="Transactions"
                                                        actions={[
                                                            {
                                                                icon: 'file_copy',
                                                                tooltip: 'select this transaction',
                                                                onClick: (event, rowData) => {
                                                                    this.fillInTransactionIdAndEmptyTransactionsList(event, rowData)
                                                                },
                                                            }
                                                        ]}
                                                    />
                                                    {/*<Table className="uk-table uk-table-small uk-table-divider uk-table-hover" caption='Transactions' head={['time', 'txid', 'value']} body={this.state.transactions}/>*/}
                                                    {/*<ul className="uk-list uk-list-striped uk-resize-vertical uk-height-small">
                                                        { this.state.transactions.map((transaction,index) => <li key={index}>
                                                            <a href="#" className="uk-icon-link" uk-icon="search" onClick={(event) => this.fillInTransactionIdAndEmptyTransactionsList(event, transaction)}></a>
                                                            time: {transaction.time}<br />txid: {transaction.txid}<br />value: {transaction.value}</li>)
                                                        }
                                                    </ul>*/}
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div className="uk-position-bottom" uk-scrollspy="cls: uk-animation-slide-bottom-small; repeat: true">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <Link className="uk-button uk-button-default" to="graph" spy={true} smooth={true} duration={500}>
                                            <span uk-icon="arrow-up"></span> BTC Price and Energy Consumption
                                        </Link>
                                        { showResults &&
                                            <Link className="uk-button uk-button-primary" to="results" spy={true} smooth={true} duration={500} uk-scrollspy="cls: uk-animation-fade; repeat: true">
                                                Calculation Result <span uk-icon="arrow-down"></span>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>

                    </div>
                </section>

                { showResults &&
                    <section id="results" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-gradient uk-light">
                        <div className="uk-width-1-1">
                            <div className="uk-container">
                                <ResultSection label="Result" color="secondary" result={this.state.emissionsResult} />
                            </div>
                            <div className="uk-position-bottom" uk-scrollspy="cls: uk-animation-slide-bottom-small; repeat: true">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <Link className="uk-button uk-button-default" to="calculate" spy={true} smooth={true} duration={500}>
                                            <span uk-icon="arrow-up"></span> How green is my BTC Wallet?
                                        </Link>
                                        <Link className="uk-button uk-button-primary" to="gamification" spy={true} smooth={true} duration={500}>
                                            What if &hellip; <span uk-icon="arrow-down"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { showGamificationResults &&
                            <div className="uk-container uk-light">
                                <div uk-sticky="cls-inactive: uk-invisible; cls-active: calculation-result-active calculation-result-active-bottom">
                                    <ResultGrid result={this.state.gamificationResult} type="primary" position="bottom" />
                                </div>
                            </div>
                        }
                    </section>
                }

                { showGamification &&
                    <section id="gamification" className="uk-position-relativ uk-height-viewport uk-section uk-section-large uk-section-default">
                        <div className="uk-width-1-1">
                            <div className="uk-container">

                                <h2>What if &hellip;</h2>
                                <WhatIf
                                    years={this.state.years}
                                    transactionYear={this.state.transactionYearEstimated}
                                    regions={this.state.regions}
                                    consumptions={this.state.consumptionPerRegion}
                                    onYearsChange={this.handleYearsChange}
                                    onRegionsChange={this.handleRegionsChange}
                                />

                            </div>
                        </div>
                    </section>
                }

            </div>
        )
    }
}

export default CarbonaraCalculator;
