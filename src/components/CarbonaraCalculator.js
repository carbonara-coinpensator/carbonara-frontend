import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import 'react-dates/initialize'
// import { DateRangePicker } from 'react-dates'
// import 'react-dates/lib/css/_datepicker.css'
import MaterialTable from 'material-table'
import moment from 'moment'
import API from '../api'
import ResultSection from './ResultSection'
import Navigation from './Navigation'
import ConsumptionGraph from './ConsumptionGraph'
import WhatIf from './WhatIf'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../scss/css.scss'

UIkit.use(Icons);

// Formula to calculate FullCo2Emission is a sum for every CountryCode of:
// (AverageEmissionPerCountry.Co2Emission / 1000) * EnergyConsumptionPerCountry.EnergyConsumption

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
        this.calculateEmission = this.calculateEmission.bind(this)
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

            focusedInput: null,
            emissionsResult: 0,

            showGamificationResults: false,
            gamificationResult: 0,

            mainCalculationResult: {}

        }

    }

    handleChange(event) {

        const name = event.target.name
        const value = event.target.value

        this.setState(
            {[name]: value},
            () => {this.validateField(name, value)}
        )

    }

    validateField(fieldName, value) {

        let walletAddressValid = this.state.addressValidity.wallet
        let transactionIdValid = this.state.addressValidity.transaction

        switch(fieldName) {
            case 'address':
                walletAddressValid = value.length == 34;
                transactionIdValid = value.length == 64;
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
            this.validateWalletForm();
        }
        if (this.state.addressValidity.transaction) {
            this.validateTransactionForm();
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

    submitForm(e) {
        let event = cloneDeep(e)
        e.preventDefault()
        if (this.state.addressValidity.wallet) {
            this.getTransactions()
        }
        if (this.state.addressValidity.transaction) {
            this.calculateEmission(event)
        }
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

    calculateGamificationForRegions() {
        console.log('ok')
    }

    calculateGamificationForYear(transactionYearEstimated) {

        // will be displayed as main result
        let emissionsResult = this.state.mainCalculationResult.calculationPerYear[transactionYearEstimated].fullCo2Emission

        // obtained region codes are used for gamification in WhatIf component
        let regions = []

        // consumption per region is used for gamification in WhatIf component
        let consumptionPerRegion = []

        // given average emissions per region
        this.state.mainCalculationResult.calculationPerYear[transactionYearEstimated].energyConsumptionPerCountry.forEach(function(v){
            // push properties to arrays
            regions.push(v.countryCode)
            consumptionPerRegion.push(v.energyConsumption)
        })

        // update state
        this.setState({
            regions,
            consumptionPerRegion,
            emissionsResult,
            transactionYearEstimated
         })

    }

    calculateEmission(event) {

        let self = this

        UIkit.notification('<div uk-spinner=""></div> Calculating emissions …', {status: 'primary'})
        API.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(res => {

            console.log(res.data)

            // obtained years are used for gamification in WhatIf component
            let years = []

            // make a list of years available for gamification out of keys in response calculationPerYear object
            Object.keys(res.data.calculationPerYear).map((k) => (
                years.push(k)
            ))

            // get year before transaction time
            let transactionYearEstimated = moment(this.state.transactionTime).subtract(1, 'years').year()

            this.setState({
                mainCalculationResult: res.data,
                transactionYearEstimated: transactionYearEstimated,
                years: years
             })

            this.calculateGamificationForYear(transactionYearEstimated)

        }).catch(function (error) {
            console.log(error);
        })
        .then(function () {
            UIkit.notification.closeAll()
            self.scrollTo(event, '#results')
        })
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

    getChartData() {
        UIkit.notification('<div uk-spinner=""></div> Getting chart data …', {status: 'primary'})
        API.get('api/Carbonara/Charts').then(res => {
            this.setState({ chart: res.data });
            UIkit.notification.closeAll()
        });
    }

    handleRegionsChange(regions) {
        this.calculateGamificationForRegions()
        this.setState({showGamificationResults: true})
    }

    handleYearsChange(year) {
        this.calculateGamificationForYear(year[0])
        this.setState({showGamificationResults: true})
    }

    componentDidMount() {
        this.getChartData()
        // UIkit.scroll(e.target)
        // this.getMiningGearYears()
    }

    componentWillUnmount() {

    }

    scrollTo(e, hash = '') {
        e.preventDefault()
        if (hash == '' && e.target.hash) {
            hash = e.target.hash
        }
        UIkit.scroll(e.target).scrollTo(hash)
    }

    render() {

        let showTransactions = this.state.transactions.length > 0 && this.state.formValidity.wallet
        let showResults = this.state.emissionsResult > 0
        let showGamification = this.state.years.length > 0 && this.state.regions.length > 0 && this.state.consumptionPerRegion.length > 0
        let showGamificationResults = this.state.showGamificationResults

        return (
            <div className="uk-text-center">

                <section id="welcome" className="uk-section uk-section-background uk-text-center uk-flex uk-flex-middle uk-position-relative uk-height-viewport">
                    <Navigation />
                    <div className="uk-width-1-1">
                        <div className="uk-container uk-container-small uk-margin-large-bottom">
                            <h1>Carbonara Coinpensator</h1>
                            <p>Welcome to the <strong>Carbonara Coinpensator</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis hendrerit ligula. Praesent sed tincidunt ante. Duis a hendrerit metus. Sed ultricies semper libero at ultrices. Donec eget velit et magna ultricies efficitur eget tincidunt massa. Nulla convallis scelerisque nunc, vel elementum turpis cursus in. Proin suscipit lacus finibus, lobortis justo sed, viverra tortor. Nunc magna lectus, volutpat at dignissim quis, tristique vel quam.</p>
                        </div>
                        <div className="uk-position-bottom">
                            <div className="uk-container">
                                <div className="uk-button-group uk-margin-large-bottom">
                                    <button className="uk-button uk-button-default" onClick={() => this.scrollTo(event, '#graph')}>
                                        BTC Price and Energy Consumption <span uk-icon="arrow-down"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                { 'priceChart' in this.state.chart && 'co2EmissionChart' in this.state.chart &&
                    <section id="graph" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default">
                        <div className="uk-width-1-1">
                            <div className="uk-container">
                                <h2 className="uk-text-center">BTC Price and Energy Consumption</h2>
                                <ConsumptionGraph className="uk-margin-top"  prices={this.state.chart.priceChart} consumptions={this.state.chart.co2EmissionChart} />
                            </div>
                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <button className="uk-button uk-button-primary" onClick={() => this.scrollTo(event, '#calculate')}>
                                            How green is my BTC Wallet? <span uk-icon="arrow-down"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                <section id="calculate" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary">
                    <div className="uk-width-1-1">
                            <div className="uk-container">

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
                                                autoFocus
                                            />
                                            <button type="submit" className={'uk-margin-top uk-button uk-button-large' + (!this.state.addressValidity.some ? ' uk-button-default uk-invisible' : ' uk-button-primary')} type="submit" disabled={!this.state.addressValidity.some}>
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
                                                <div>
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

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <button className="uk-button uk-button-default" onClick={() => this.scrollTo(event, '#graph')}>
                                            <span uk-icon="arrow-up"></span> BTC Price and Energy Consumption
                                        </button>
                                        { showResults &&
                                            <button className="uk-button uk-button-primary" onClick={() => this.scrollTo(event, '#results')}>
                                                Calculation Result <span uk-icon="arrow-down"></span>
                                            </button>
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

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <button className="uk-button uk-button-default" onClick={() => this.scrollTo(event, '#calculate')}>
                                            <span uk-icon="arrow-up"></span> How green is my BTC Wallet?
                                        </button>
                                        <button className="uk-button uk-button-primary" onClick={() => this.scrollTo(event, '#gamification')}>
                                            What if &hellip; <span uk-icon="arrow-down"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
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

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <button className="uk-button uk-button-default" onClick={() => this.scrollTo(event, '#results')}>
                                            <span uk-icon="arrow-up"></span> Calculation Result
                                        </button>
                                        { showGamificationResults &&
                                            <button className="uk-button uk-button-primary" onClick={() => this.scrollTo(event, '#gamificationresults')}>
                                                View Result <span uk-icon="arrow-down"></span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                }

                { /*showGamificationResults &&
                    <section id="gamificationresults" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary">
                        <div className="uk-width-1-1">
                            <div className="uk-container">

                                <ResultSection label="Better result" color="primary" result={this.state.emissionsResult} />

                            </div>

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div className="uk-button-group uk-margin-large-bottom">
                                        <button className="uk-button uk-button-primary" onClick={() => this.scrollTo(event, '#gamification')}>
                                            <span uk-icon="arrow-up"></span> What if &hellip;
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section> */
                }

            </div>
        );
    }
}

export default CarbonaraCalculator;
