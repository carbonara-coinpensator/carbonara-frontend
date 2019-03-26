import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'

import Table from 'react-uikit-table'
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
        this.fillInTransactionId = this.fillInTransactionId.bind(this)
        this.getChartData = this.getChartData.bind(this)
        this.activateGamificationResults = this.activateGamificationResults.bind(this)

        // this.onChangeDateRange = this.onChangeDateRange.bind(this)
        // this.getMiningGearYears = this.getMiningGearYears.bind(this)

        this.state = {

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

            startDate: null,
            endDate: null,


            dateRangeValid: false,

            transactions: [],
            years: [],
            regions: [],
            emissionsPerRegion: [],
            chart: {},

            focusedInput: null,
            emissionsResult: 0,

            showGamificationResults: false,
            gamificationResult: 0

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
        e.preventDefault()
        if (this.state.addressValidity.wallet) {
            this.getTransactions(e)
        }
        if (this.state.addressValidity.transaction) {
            this.calculateEmission(e)
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

    calculateEmission(e) {

        UIkit.notification('<div uk-spinner=""></div> Calculating emissions …', {status: 'primary'})
        API.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(res => {

            let emissionsResult = 0
            let regions = []
            let emissionsPerRegion = []
            res.data.averageEmissionPerCountry.forEach(function(v,k){
                regions.push(v.countryCode)
                emissionsPerRegion.push(v.co2Emission.toFixed(2))
                if (v.countryCode == 'US') {
                    emissionsResult = v.co2Emission
                }
            })
            this.setState({ emissionsResult: emissionsResult.toFixed(2) })
            this.setState({ regions: regions })
            this.setState({ emissionsPerRegion: emissionsPerRegion })

            let years = []
            Object.keys(res.data.calculationPerYear).map((k, v) => (
                years.push(k)
            ))
            this.setState({ years: years })

            UIkit.notification.closeAll()

        })
    }

    fillInTransactionId(e, transaction) {
        e.preventDefault();
        this.handleChange(e);
        this.setState({
            addressValidity: {
                wallet: false,
                transaction: true,
                some: true
            },
            address: transaction.txid
         });
    }

    getChartData() {
        UIkit.notification('<div uk-spinner=""></div> Getting chart data …', {status: 'primary'})
        API.get('api/Carbonara/Charts').then(res => {
            this.setState({ chart: res.data });
            UIkit.notification.closeAll()
        });
    }

    activateGamificationResults() {
        this.setState({showGamificationResults: true})
    }

    /*onChangeDateRange(startDate, endDate) {
        this.setState({
            startDate: startDate,
            endDate: endDate,
            dateRangeValid: true
        });
        if (startDate && endDate) {
            this.validateWalletForm();
        }
    }*/

    /*getMiningGearYears() {
        API.get('api/Carbonara/MinningGearYearsSelection').then(res => {
            this.setState({ years: res.data });
        });
    }*/

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
        let showGamification = this.state.years.length > 0 && this.state.regions.length > 0 && this.state.emissionsPerRegion.length > 0
        let showGamificationResults = this.state.showGamificationResults

        return (
            <div>

                <Navigation />

                { 'priceChart' in this.state.chart && 'co2EmissionChart' in this.state.chart &&
                    <section id="graph" className="uk-flex uk-flex-middle uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default"  uk-scrollspy="cls:uk-animation-fade">
                        <div className="uk-width-1-1">
                            <div className="uk-container">
                                <h2>BTC Price and Energy Consumption</h2>
                                <ConsumptionGraph className="uk-margin-top"  prices={this.state.chart.priceChart} consumptions={this.state.chart.co2EmissionChart} />
                            </div>
                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div uk-grid="">
                                        <div className="uk-width-1-3"></div>
                                        <div className="uk-width-2-3">
                                            <div uk-grid="" className="uk-button-group uk-margin-large-bottom">
                                                <div className="uk-width-1-2"></div>
                                                <button className="uk-width-1-2 uk-button uk-button-primary uk-button-large" onClick={() => this.scrollTo(event, '#calculate')}>
                                                    How green is my BTC Wallet? <span uk-icon="arrow-down"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                <section id="calculate" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary"  uk-scrollspy="cls:uk-animation-fade">
                    <div className="uk-width-1-1">
                            <div className="uk-container">

                                <h2>How <strong>green</strong> is my BTC Wallet?</h2>

                                <form onSubmit={this.submitForm} className="uk-margin-large-top">
                                    <div className="uk-margin">
                                        <label className="uk-form-label" htmlFor="address">Wallet Address or Transaction ID</label>
                                        <div className="uk-form-controls">
                                            <div uk-grid="" className="uk-grid-collapse">
                                                <div className="uk-width-4-5">
                                                    <input className="uk-input uk-form-large"
                                                        id="address"
                                                        type="text"
                                                        name="address"
                                                        placeholder="Wallet Address or Transaction ID"
                                                        value={this.state.address}
                                                        onChange={(event) => this.handleChange(event)}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="uk-width-1-5">
                                                    <button type="submit" className={'uk-width-1-1 uk-button uk-button-large' + (!this.state.addressValidity.some ? ' uk-button-default' : ' uk-button-primary')} type="submit" disabled={!this.state.addressValidity.some}>Calculate</button>
                                                </div>
                                            </div>
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
                                                                    this.fillInTransactionId(event, rowData)
                                                                },
                                                            }
                                                        ]}
                                                    />
                                                    {/*<Table className="uk-table uk-table-small uk-table-divider uk-table-hover" caption='Transactions' head={['time', 'txid', 'value']} body={this.state.transactions}/>*/}
                                                    {/*<ul className="uk-list uk-list-striped uk-resize-vertical uk-height-small">
                                                        { this.state.transactions.map((transaction,index) => <li key={index}>
                                                            <a href="#" className="uk-icon-link" uk-icon="search" onClick={(event) => this.fillInTransactionId(event, transaction)}></a>
                                                            time: {transaction.time}<br />txid: {transaction.txid}<br />value: {transaction.value}</li>)
                                                        }
                                                    </ul>*/}
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </form>

                                <div className="uk-text-small">
                                    <p>Example Wallet Address: <br /><code>1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC</code></p>
                                    <p>Example Transaction ID: <br /><code>e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8</code></p>
                                </div>

                            </div>

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div uk-grid="">
                                        <div className="uk-width-1-3"></div>
                                        <div className="uk-width-2-3">
                                            <div uk-grid="" className="uk-button-group uk-margin-large-bottom">
                                                <button className="uk-width-1-2 uk-button uk-button-default uk-button-large" onClick={() => this.scrollTo(event, '#graph')}>
                                                    <span uk-icon="arrow-up"></span> BTC Price and Energy Consumption
                                                </button>
                                                { showResults &&
                                                    <button className="uk-width-1-2 uk-button uk-button-primary uk-button-large" onClick={() => this.scrollTo(event, '#results')}>
                                                        Calculation Result <span uk-icon="arrow-down"></span>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </section>

                { showResults &&
                    <section id="results" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-secondary"  uk-scrollspy="cls:uk-animation-fade">
                        <div className="uk-width-1-1">
                            <div className="uk-container">

                                <h2>Calculation Result</h2>
                                <ResultSection label="Result" color="secondary" result={this.state.emissionsResult} />

                            </div>

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div uk-grid="">
                                        <div className="uk-width-1-3"></div>
                                        <div className="uk-width-2-3">
                                            <div uk-grid="" className="uk-button-group uk-margin-large-bottom">
                                                <button className="uk-width-1-2 uk-button uk-button-default uk-button-large" onClick={() => this.scrollTo(event, '#calculate')}>
                                                    <span uk-icon="arrow-up"></span> How green is my BTC Wallet?
                                                </button>
                                                <button className="uk-width-1-2 uk-button uk-button-primary uk-button-large" onClick={() => this.scrollTo(event, '#gamification')}>
                                                    What if &hellip; <span uk-icon="arrow-down"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                }

                { showGamification &&
                    <section id="gamification" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default"  uk-scrollspy="cls:uk-animation-fade">
                        <div className="uk-width-1-1">
                            <div className="uk-container">

                                <h2>What if &hellip;</h2>
                                <WhatIf years={this.state.years} regions={this.state.regions} emissions={this.state.emissionsPerRegion} onWhatifChange={this.activateGamificationResults} />

                            </div>

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div uk-grid="">
                                        <div className="uk-width-1-3"></div>
                                        <div className="uk-width-2-3">
                                            <div uk-grid="" className="uk-button-group uk-margin-large-bottom">
                                                <button className="uk-width-1-2 uk-button uk-button-default uk-button-large" onClick={() => this.scrollTo(event, '#results')}>
                                                    <span uk-icon="arrow-up"></span> Calculation Result
                                                </button>
                                                { showGamificationResults &&
                                                    <button className="uk-width-1-2 uk-button uk-button-primary uk-button-large" onClick={() => this.scrollTo(event, '#gamificationresults')}>
                                                       View Result <span uk-icon="arrow-down"></span>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                }

                { showGamificationResults &&
                    <section id="gamificationresults" className="uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary"  uk-scrollspy="cls:uk-animation-fade">
                        <div className="uk-width-1-1">
                            <div className="uk-container">

                                <h2>Result</h2>
                                <ResultSection label="Better result" color="primary" result={this.state.emissionsResult} />

                            </div>

                            <div className="uk-position-bottom">
                                <div className="uk-container">
                                    <div uk-grid="">
                                        <div className="uk-width-1-3"></div>
                                        <div className="uk-width-2-3">
                                            <div uk-grid="" className="uk-button-group uk-margin-large-bottom">
                                                <div className="uk-width-1-2"></div>
                                                <button className="uk-width-1-2 uk-button uk-button-primary uk-button-large" onClick={() => this.scrollTo(event, '#gamification')}>
                                                    <span uk-icon="arrow-up"></span> What if &hellip;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                }

            </div>
        );
    }
}

export default CarbonaraCalculator;
