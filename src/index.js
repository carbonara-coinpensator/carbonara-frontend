import React, { Component } from 'react';
import API from './api';

import FormErrors from './FormErrors.js';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello there');

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import './styles.css';

class CarbonaraWidget extends Component {

    constructor(...props) {
        super(...props);

        this.state = {

            address: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC',
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
        };

        this.onChangeDateRange = this.onChangeDateRange.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForms = this.validateForms.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.test = this.test.bind(this);

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

        // API.get(`users`)
        //     .then(res => {
        //         const transactions = res.data
        //         this.setState({ transactions })
        //     })

        // API.get('api/Carbonara/Calculation?TxHash=d99439e228bc0cb2199eaaaa2303ef4c7fd85fbd529070ba175f86252c8577ce').then(res => {
        //     console.log(res.data);
        //     this.setState({ emissionsResult: res.data });
        // });

        API.get('api/Carbonara/TransactionList',{
            BitcoinAddress: this.state.address
        }).then(res => {
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

        /*const postdata = {
            address: this.state.address
        };

        API.post(`users`, { postdata })
            .then(res => {
                this.state.transactions.push({
                    id: res.data.id, 
                    name: postdata.address 
                })
                this.setState({ res })
                UIkit.notification('success');
            })*/
        
        API.get('api/Carbonara/Calculation?TxHash=d99439e228bc0cb2199eaaaa2303ef4c7fd85fbd529070ba175f86252c8577ce').then(res => {
            console.log(res.data);
            this.setState({ emissionsResult: res.data });
        });
    }

    test(event) {
        console.log('test');
        this.handleChange(event);
        this.setState({ 
            address: 'd99439e228bc0cb2199eaaaa2303ef4c7fd85fbd529070ba175f86252c8577ce'
         });
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {

        const walletAddressValid = this.state.walletAddressValid;
        let renderDateRangePicker;

        if (walletAddressValid) {
            renderDateRangePicker = <DateRangePicker
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
            />;
        }

        return (
            <div>
            
                <section className="uk-section uk-section-primary">
                
                    <div className="uk-container uk-container-small">

                        <h1>Carbonara Widget</h1>

                        <FormErrors formErrors={this.state.formErrors} />
                        
                        <form onSubmit={this.handleSubmit}>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="address">Wallet Address or Transaction ID</label>
                                <div className="uk-form-controls">
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
                            </div>

                            { renderDateRangePicker }
                            

                            <ul>
                                { this.state.transactions.map(transaction => <li onClick={(event) => this.test(event)}>{transaction}</li>)}
                            </ul>

                            <button className={'uk-button uk-button-large uk-align-right' + (!this.state.transactionIdValid ? ' uk-button-default' : ' uk-button-primary')} type="submit" disabled={!this.state.transactionIdValid}>Calculate</button>

                        </form>

                    </div>

                </section>

                <section className="uk-section uk-section-secondary">
                    <div className="uk-container uk-container-small">
                        <p className="uk-text-right uk-h1">
                            { this.state.emissionsResult }
                        </p>
                    </div>
                </section>

            </div>
        );
    }
}

export default CarbonaraWidget;
