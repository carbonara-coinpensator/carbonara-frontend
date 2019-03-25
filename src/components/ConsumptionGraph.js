import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'

class ConsumptionGraph extends Component {

    constructor(...props) {

        super(...props)
        this.state = {
            chart: {
                options: {
                    chart: {
                        id: 'priceandconsumption'
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
        }

    }

    componentDidMount() {

    }

    render() {

        return (
            <section className="uk-section uk-section-large uk-section-default">
                <div className="uk-container">
                    <h2><span uk-icon="icon: list; ratio: 2" className="uk-margin-right"></span> BTC Price and Energy Consumption</h2>
                    <Chart className="uk-margin-top" options={this.state.chart.options} series={this.state.chart.series} type="line" width="100%" height={300} />
                </div>
            </section>
        )
    }

}

export default ConsumptionGraph
