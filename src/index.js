import React, { Component } from 'react';
import API from './api';
import './styles.css';
import FormErrors from './FormErrors.js';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification('Hello there');







class CarbonaraWidget extends React.Component {

    constructor(...props) {
        super(...props);

        this.state = {
            walletaddress: '',
            datefrom: new Date('2019-03-10').toLocaleDateString(),
            dateto: new Date().toLocaleDateString(),
            transactions: [],
            formErrors: {
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
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
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
            formErrors: fieldValidationErrors,
            walletaddressValid: walletaddressValid,
        }, this.validateForm);
      }
      
    validateForm() {
        this.setState((state) => ({formValid: state.walletaddressValid && state.datefromValid && state.datetoValid}));
    }

    handleChange(event) {
        
        // this.setState({ 
        //     walletaddress: event.target.value
        // });

        const name = event.target.name;
        const value = event.target.value;
        this.setState(
            {[name]: value}, 
            () => {this.validateField(name, value)}
        );

        this.getTransactions()

    }

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

        return (
            <div className="uk-section uk-section-primary uk-height-1-1">
            
                <div className="uk-container uk-container-small">

                    <h1>Carbonara Widget</h1>
                    <p>
                        <strong>Wallet Address:</strong> {this.state.walletaddress}<br />
                        <strong>Number of Transactions:</strong> {this.state.transactions.length}
                    </p>

                    <FormErrors formErrors={this.state.formErrors} />
                    
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
