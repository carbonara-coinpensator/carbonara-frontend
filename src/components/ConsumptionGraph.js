import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import Moment from 'react-moment'

class ConsumptionGraph extends Component {

    constructor(...props) {

        super(...props)
        this.state = {
            chart: {
                options: {
                    colors: ['#14121D', '#336600'],
                    chart: {
                        id: 'priceandconsumption'
                    },
                    xaxis: {
                        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
                    },
                    stroke: {
                        show: true,
                        curve: 'straight',
                        lineCap: 'butt',
                        colors: undefined,
                        width: 3,
                        dashArray: 0,
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
            <div>
                <Chart options={this.state.chart.options} series={this.state.chart.series} type="line" width="100%" height={350} />
            </div>
        )
    }

}

export default ConsumptionGraph
