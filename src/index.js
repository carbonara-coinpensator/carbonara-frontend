import React, { Component } from 'react';
import API from './api';
import './styles.css';

export const doIncrement = (prevState) => ({
  counter: prevState.counter + 1,
});

export const doDecrement = (prevState) => ({
  counter: prevState.counter - 1,
});

class CarbonaraWidget extends Component {

    constructor() {
        super();

        this.state = {
            counter: 0,
            persons: [],
            name: '',
        };

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onIncrement() {
        this.setState(doIncrement);
    }

    onDecrement() {
        this.setState(doDecrement);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const user = {
            name: this.state.name
        };

        API.post(`users`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    //https://alligator.io/react/axios-react/
    componentDidMount() {
        API.get(`users`)
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
            console.log(persons)
        })
    }

    render() {

        const { counter } = this.state;

        return (
            <div>
            <h1>Carbonara Widget test</h1>

            <form onSubmit={this.handleSubmit}>
                <label>
                    New Person Name:&nbsp;
                    <input type="text" name="name" onChange={this.handleChange} />
                </label>&nbsp;
                <button type="submit">Add</button>
            </form>

            <p>
                <label>Dummy Field</label><br />
                <input type="text"
                name="walletaddress"
                placeholder="Wallet Address" />
            </p>
            <p>
                <label>Dummy Field</label><br />
                <input type="date"
                name="startdatetime" />
            </p>
            <p>
                <label>Dummy Field</label><br />
                <input type="date"
                name="enddatetime" />
            </p>

            <ul>
                { this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>

            <Counter counter={counter} />

            <button
                type="button"
                onClick={this.onIncrement}
            >
                Increment
            </button>

            <button
                type="button"
                onClick={this.onDecrement}
            >
                Decrement
            </button>

            </div>
        );
    }
}

export const Counter = ({ counter }) =>
  <p>{counter}</p>

export default CarbonaraWidget;
