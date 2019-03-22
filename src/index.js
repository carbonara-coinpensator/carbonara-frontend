import React, { Component } from 'react';
import API from './api';


import logo from './images/carbonara-logo.png';

import ResultSection from './ResultSection';
import WhatIf from './WhatIf';



// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello there');

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';



import Chart from 'react-apexcharts'







/*import ReactDOM from "react-dom"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"*/






import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import 'uikit/dist/css/uikit.min.css';
import './scss/css.scss';

class CarbonaraWidget extends Component {

    constructor(...props) {
        super(...props);

        this.state = {

            address: '',
            // address: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC',
            // address: 'd99439e228bc0cb2199eaaaa2303ef4c7fd85fbd529070ba175f86252c8577ce',
            startDate: null,
            endDate: null,

            walletAddressValid: false,
            transactionIdValid: false,
            dateRangeValid: false,

            walletFormValid: false,
            transactionFormValid: false,

            transactions: [],

            focusedInput: null,
            emissionsResult: 0,

            chart: {
                options: {
                    chart: {
                        id: 'apexchart-example'
                    },
                    xaxis: {
                        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
                    }
                },
                series: [
                    {
                        name: 'BTC price',
                        data: [30, 40, 45, 50, 49, 60, 50, 20, 90, 70]
                    },
                    {
                        name: 'Energy comsumption',
                        data: [50, 70, 55, 60, 50, 50, 50, 40, 60, 50]
                    }
                ]
            }

        };

        this.onChangeDateRange = this.onChangeDateRange.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForms = this.validateForms.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInTransactionId = this.fillInTransactionId.bind(this);

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

        API.get('api/Carbonara/TransactionList?BitcoinAddress=' + this.state.address).then(res => {
            this.setState({ transactions: res.data });
        });

    }

    /**
     * Validate a form field, set validation errors state,
     * trigger form validateion
     * @param {*} fieldName
     * @param {*} value
     */
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



    /**
     * Gets fired after each change in a form field
     * and triggers field validation
     * @param {*} event
     */
    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {[name]: value},
            () => {this.validateField(name, value)}
        );

    }

    /**
     * Submit the form
     * @param {*} event
     */
    handleSubmit(event) {
        event.preventDefault();

        API.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(res => {
            console.log(res.data);
            this.setState({ emissionsResult: Math.round(res.data.calculationPerYear[2013].fullCo2Emission) });
        });
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
        /*this.setState({
            address: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC',
            walletAddressValid: true
        });*/
    }

    componentWillUnmount() {

    }

    render() {

        const walletAddressValid = this.state.walletAddressValid;
        const walletFormValid = this.state.walletFormValid;
        const emissionsResult = this.state.emissionsResult;

        let renderDateRangePicker;
        let renderTransactionsList;
        let renderTransactionResult;
        let renderPlayResult;

        if (walletAddressValid) {
            renderDateRangePicker = <div><label className="uk-form-label">Please pick a date range</label><br /><DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                // onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                onDatesChange={({ startDate, endDate }) => { this.onChangeDateRange( startDate, endDate )}}
                focusedInput={this.state.focusedInput}
                onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                // startDatePlaceholderText=""
                // endDatePlaceholderText=""
                // disabled="true"
                // required="true"
                // readOnly="true"
                // screenReaderInputMessage=""
                showClearDates={true}
                showDefaultInputIcon={true}
                // customInputIcon={<span uk-icon="icon: calendar"></span>}
                // customArrowIcon=""
                // customCloseIcon=""
                // inputIconPosition="after"
                // noBorder="true"
                // block="true"
                // small=""
                // regular=""
                verticalSpacing={0}
                // renderMonthText=""
                // orientation="vertical"
                // anchorDirection="ANCHOR_RIGHT"
                // openDirection=""
                // horizontalMargin=""
                // withPortal="true"
                // withFullScreenPortal=""
                // appendToBody=""
                // disableScroll={true}
                // daySize=""
                // isRTL=""
                // initialVisibleMonth=""
                firstDayOfWeek={1}
                // numberOfMonths=""
                // keepOpenOnDateSelect={true}
                // reopenPickerOnClearDates=""
                // renderCalendarInfo=""
                // renderMonthElement=""
                hideKeyboardShortcutsPanel={true}
                // navPrev=PropTypes.node,
                // navNext=PropTypes.node,
                // onPrevMonthClick=PropTypes.func,
                // onNextMonthClick=PropTypes.func,
                // onClose=PropTypes.func,
                transitionDuration={100}
                // renderCalendarDay=PropTypes.func,
                // renderDayContents=PropTypes.func,
                // minimumNights=PropTypes.number,
                // enableOutsideDays=PropTypes.bool,
                // isDayBlocked=PropTypes.func,
                // isOutsideRange={isOutsideRange}
                // isDayHighlighted=PropTypes.func,
                displayFormat="YYYY-MM-DD"
                // monthFormat=PropTypes.string,
                // weekDayFormat=PropTypes.string,
                // phrases=PropTypes.shape(getPhrasePropTypes(DateRangePickerPhrases)),
                // dayAriaLabelFormat=PropTypes.string,
            /></div>;
        }

        if (walletFormValid) {
            renderTransactionsList = <div><label className="uk-form-label">Please select a transaction</label><br /><ul className="uk-list uk-list-striped">{ this.state.transactions.map((transaction,index) => <li key={index}><a href="#" className="uk-icon-link" uk-icon="search" onClick={(event) => this.fillInTransactionId(event, transaction)}></a> time: {transaction.time}<br />txid: {transaction.txid}<br />value: {transaction.value}</li>)}</ul></div>
        }

        if (emissionsResult > 0) {
            renderTransactionResult = <ResultSection label="Result" color="secondary" result={emissionsResult} />
            renderPlayResult = <ResultSection label="Better result" color="primary" result={emissionsResult} />
        }

        return (
            <div>

                <nav className="uk-navbar-container uk-margin" uk-navbar="">
                    <div className="uk-navbar-center">

                        <div className="uk-navbar-center-left"><div>
                            <ul className="uk-navbar-nav">
                                <li className="uk-active"><a href="#">Calculator</a></li>
                            </ul>
                        </div></div>
                        <a className="uk-navbar-item uk-logo" href="#">
                            <img width="200" src={logo} />
                        </a>
                        <div className="uk-navbar-center-right"><div>
                            <ul className="uk-navbar-nav">
                                <li><a href="#">Greenpaper</a></li>
                            </ul>
                        </div></div>

                    </div>
                </nav>

                <section className="uk-section uk-section-large uk-section-default">
                    <div className="uk-container uk-position-relative">

                        <h2><span uk-icon="icon: list; ratio: 2" className="uk-margin-right"></span> BTC Price and Energy Consumption</h2>
                        <span className="uk-label uk-position-top-right">Overview</span>

                        <Chart className="uk-margin-top" options={this.state.chart.options} series={this.state.chart.series} type="line" width="100%" height={300} />
                    </div>
                </section>

                <section className="uk-section uk-section-large uk-section-primary">
                    <div className="uk-container uk-position-relative">

                        <h2><span uk-icon="icon: cog; ratio: 2" className="uk-margin-right"></span> How <span className="uk-text-success">green</span> is my BTC Wallet?<code>1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC</code></h2>
                        <span className="uk-label uk-position-top-right">Calculation</span>

                        <form onSubmit={this.handleSubmit} className="uk-margin-large-top">
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
                                    { renderDateRangePicker }
                                </div>
                                <div className="uk-width-2-3">
                                    { renderTransactionsList }
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                { renderTransactionResult }

                <WhatIf />

                { renderPlayResult }

            </div>
        );
    }
}

export default CarbonaraWidget;
