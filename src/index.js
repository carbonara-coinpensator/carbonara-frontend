import React, { Component } from 'react';
import API from './api';
import './styles.css';
import FormErrors from './FormErrors.js';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello there');



import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';





class CarbonaraWidget extends React.Component {

    constructor(...props) {
        super(...props);

        this.state = {
            walletaddress: '',
            datefrom: new Date('2019-03-10').toLocaleDateString(),
            dateto: new Date().toLocaleDateString(),
            transactions: [],
            fieldValidationErrors: {
                walletaddress: '',
                datefrom: '',
                dateto: '',
            },
            walletaddressValid: false,
            datefromValid: true,
            datetoValid: true,
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getTransactions() {

        API.get(`users`)
            .then(res => {
                const transactions = res.data
                this.setState({ transactions })
            })

        // API.get('api/Carbonara/Calculation',{
        //     'TxHash': '870edc76da4381d6d2ec0938dbbb2eeffd7a8c04bbf6d0c510b3b4fd183391a7',
        //     // 'MinningGearYear': 2018,
        //     // 'HashingAlgorithm': '',
        //     // 'CO2EmissionCountry': '',
        //     // BitcoinAddress: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC'
        // }).then(res => {
        //     const transactions = res.data;
        //     this.setState({transactions});
        // });

        // API.get('api/Carbonara/TransactionList',{
        //     BitcoinAddress: '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC'
        // }).then(res => {
        //     const transactions = res.data;
        //     this.setState({transactions});
        // });

    }

    /**
     * Validate a form field, set validation errors state,
     * trigger form validateion
     * @param {*} fieldName 
     * @param {*} value 
     */
    validateField(fieldName, value) {

        let fieldValidationErrors = this.state.fieldValidationErrors;
        let walletaddressValid = this.state.walletaddressValid;

        switch(fieldName) {
            case 'walletaddress':
                // TODO: implement wallet address validator
                walletaddressValid = value.length >= 3;
                fieldValidationErrors.walletaddress = walletaddressValid ? '' : ' is too short';
            break;
            default:
            break;
        }

        this.setState({
            fieldValidationErrors: fieldValidationErrors,
            walletaddressValid: walletaddressValid,
        }, () => this.validateForm());

    }
    
    /**
     * Set formValid in state and trigger getTransactions if valid
     */
    validateForm() {
        
        let formValid = this.state.walletaddressValid && this.state.datefromValid && this.state.datetoValid;
        
        this.setState({
            formValid: formValid
        });

        // TODO: handle as callback
        if (formValid) {
            this.getTransactions();
        }

    }

    handleSelect(ranges){
        console.log(ranges);
        // {
		// 	selection: {
		// 		startDate: [native Date Object],
		// 		endDate: [native Date Object],
		// 	}
		// }
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

        const postdata = {
            walletaddress: this.state.walletaddress
        };

        API.post(`users`, { postdata })
            .then(res => {
                this.state.transactions.push({
                    id: res.data.id, 
                    name: postdata.walletaddress 
                })
                this.setState({ res })
                UIkit.notification('success');
            })
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {

        const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		}

        return (
            <div className="uk-section uk-section-primary uk-height-1-1">
            
                <div className="uk-container uk-container-small">

                    <h1>Carbonara Widget</h1>
                    <p>
                        <strong>Wallet Address:</strong> {this.state.walletaddress}<br />
                        <strong>Number of Transactions:</strong> {this.state.transactions.length}
                    </p>

                    <FormErrors formErrors={this.state.formErrors} />

                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={this.handleSelect}
                    />
                    
                    <form onSubmit={this.handleSubmit}>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="walletaddress">Wallet Address</label>
                            <div className="uk-form-controls">
                                <input className="uk-input" 
                                    id="walletaddress" 
                                    type="text" 
                                    name="walletaddress" 
                                    placeholder="BTC/ETH Wallet Address" 
                                    value={this.state.walletaddress}
                                    onChange={(event) => this.handleChange(event)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div uk-grid="">

                            <div className="uk-width-1-2">
                                <label className="uk-form-label" htmlFor="datefrom">Date From</label>
                                <div className="uk-form-controls">
                                    <input className="uk-input" 
                                        id="datefrom" 
                                        type="text" 
                                        name="datefrom" 
                                        value={this.state.datefrom}
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </div>
                            </div>

                            <div className="uk-width-1-2">
                                <label className="uk-form-label" htmlFor="dateto">Date To</label>
                                <div className="uk-form-controls">
                                    <input className="uk-input" 
                                        id="dateto" 
                                        type="text" 
                                        name="dateto" 
                                        value={this.state.dateto}
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </div>
                            </div>

                        </div>

                        <ul>
                            { this.state.transactions.map(transaction => <li key={transaction.id}>{transaction.id}: {transaction.name}</li>)}
                        </ul>

                        <button className={'uk-button uk-button-large uk-align-right' + (!this.state.formValid ? ' uk-button-default' : ' uk-button-primary')} type="submit" disabled={!this.state.formValid}>Calculate</button>

                    </form>

                </div>

            </div>
        );
    }
}

export default CarbonaraWidget;
