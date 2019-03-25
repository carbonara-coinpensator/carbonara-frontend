import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates'

import API from '../api';

import ResultSection from './ResultSection';
import Navigation from './Navigation';
import ConsumptionGraph from './ConsumptionGraph';
import WhatIf from './WhatIf';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../scss/css.scss';

UIkit.use(Icons);
// UIkit.notification('Hello there');

class CarbonaraCalculator extends Component {

    constructor(...props) {

        super(...props)
        this.onChangeDateRange = this.onChangeDateRange.bind(this)
        this.getTransactions = this.getTransactions.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForms = this.validateForms.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.calculateEmission = this.calculateEmission.bind(this)
        this.fillInTransactionId = this.fillInTransactionId.bind(this)
        // this.getMiningGearYears = this.getMiningGearYears.bind(this)
        this.getChartData = this.getChartData.bind(this)
        this.state = {

            address: '',
            // address: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC',
            // address: 'e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8',
            startDate: null,
            endDate: null,

            walletAddressValid: false,
            transactionIdValid: false,
            dateRangeValid: false,

            walletFormValid: false,
            transactionFormValid: false,

            transactions: [],
            years: [],
            regions: [],
            emissionsPerRegion: [],
            chart: {},

            focusedInput: null,
            emissionsResult: 0,

        }

    }

    onChangeDateRange(startDate, endDate) {
        this.setState({
            startDate: startDate,
            endDate: endDate,
            dateRangeValid: true
        });
        if (startDate && endDate) {
            this.validateWalletForm();
        }
    }

    getTransactions() {
        UIkit.notification('getting transactions …', {status: 'primary'})
        API.get('api/Carbonara/TransactionList?BitcoinAddress=' + this.state.address).then(res => {
            UIkit.notification.closeAll()
            this.setState({ transactions: res.data })
        });
    }

    calculateEmission(event) {

        event.preventDefault()
        UIkit.notification('calculating …', {status: 'primary'})

        API.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(res => {
            UIkit.notification.closeAll()

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

            // console.log(res.data)

        })
    }

    /*getMiningGearYears() {
        API.get('api/Carbonara/MinningGearYearsSelection').then(res => {
            this.setState({ years: res.data });
        });
    }*/

    getChartData() {
        UIkit.notification('getting charts …', {status: 'primary'})
        API.get('api/Carbonara/Charts').then(res => {
            UIkit.notification.closeAll()
            this.setState({ chart: res.data });
        });
    }

    validateField(fieldName, value) {

        let walletAddressValid = this.state.walletAddressValid;
        let transactionIdValid = this.state.transactionIdValid;

        switch(fieldName) {
            case 'address':
                walletAddressValid = value.length == 34;
                transactionIdValid = value.length == 64;
                break;
            default:
                break;
        }

        this.setState({
            walletAddressValid: walletAddressValid,
            transactionIdValid: transactionIdValid,
        }, () => this.validateForms());

    }

    validateForms() {
        if (this.state.walletAddressValid) {
            this.validateWalletForm();
        }
        if (this.state.transactionIdValid) {
            this.transactionFormValid();
        }
    }

    validateWalletForm() {
        let walletFormValid = this.state.walletAddressValid && this.state.dateRangeValid;
        this.setState({ walletFormValid });
        if (walletFormValid) {
            this.getTransactions();
        }
    }

    transactionFormValid() {
        let transactionFormValid = this.state.transactionIdValid;
        this.setState({ transactionFormValid });
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {[name]: value},
            () => {this.validateField(name, value)}
        );

    }

    fillInTransactionId(event, transaction) {
        event.preventDefault();

        this.handleChange(event);
        this.setState({
            walletAddressValid: false,
            dateRangeValid: false,
            walletFormValid: false,
            transactionIdValid: true,
            address: transaction.txid
         });
    }

    componentDidMount() {
        this.setState({
            address: 'e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8',
            walletAddressValid: true,
            transactionIdValid: true
        });
        // this.getMiningGearYears()
        this.getChartData()
    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div>

                <Navigation />

                { 'priceChart' in this.state.chart && 'co2EmissionChart' in this.state.chart &&
                    <ConsumptionGraph prices={this.state.chart.priceChart} consumptions={this.state.chart.co2EmissionChart} />
                }

                <section className="uk-section uk-section-large uk-section-primary">
                    <div className="uk-container">

                        <h2>
                            <span uk-icon="icon: cog; ratio: 2" className="uk-margin-right"></span> How <span className="uk-text-success">green</span> is my BTC Wallet?<br />
                            <code>1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC</code><br />
                            <code>e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8</code>
                        </h2>

                        <form onSubmit={this.calculateEmission} className="uk-margin-large-top">
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="address">Wallet Address or Transaction ID</label>
                                <div className="uk-form-controls">
                                    <div uk-grid="" className="uk-grid-collapse">
                                        <div className="uk-width-3-4">
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
                                        <div className="uk-width-1-4">
                                            <button className={'uk-button uk-button-large' + (!this.state.transactionIdValid ? ' uk-button-default' : ' uk-button-primary')} type="submit" disabled={!this.state.transactionIdValid}>Calculate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div uk-grid="">
                                <div className="uk-width-1-3">

                                    { this.state.walletAddressValid &&
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

                                </div>
                                <div className="uk-width-2-3">

                                    { this.state.walletFormValid &&
                                        <div>
                                            <label className="uk-form-label">Please select a transaction</label>
                                            <br />
                                            <ul className="uk-list uk-list-striped">
                                                { this.state.transactions.map((transaction,index) => <li key={index}>
                                                    <a href="#" className="uk-icon-link" uk-icon="search" onClick={(event) => this.fillInTransactionId(event, transaction)}></a>
                                                    time: {transaction.time}<br />txid: {transaction.txid}<br />value: {transaction.value}</li>)
                                                }
                                            </ul>
                                        </div>
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                { this.state.emissionsResult > 0 &&
                    <ResultSection label="Result" color="secondary" result={this.state.emissionsResult} />
                }

                { this.state.years.length && this.state.regions.length && this.state.emissionsPerRegion.length &&
                    <WhatIf years={this.state.years} regions={this.state.regions} emissions={this.state.emissionsPerRegion} />
                }

                { this.state.emissionsResult > 0 &&
                    <ResultSection label="Better result" color="primary" result={this.state.emissionsResult} />
                }

            </div>
        );
    }
}

export default CarbonaraCalculator;
