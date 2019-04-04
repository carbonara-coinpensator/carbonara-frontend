import React, { Component } from 'react'
import Chart from 'react-apexcharts'
// import Moment from 'react-moment'

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
                        type: 'datetime'
                    },
                    stroke: {
                        show: true,
                        curve: 'straight',
                        lineCap: 'butt',
                        colors: undefined,
                        width: 2,
                        dashArray: 0,
                    }
                },
                series: [
                    {
                        name: 'BTC price',
                        data: this.transformValues(this.props.prices, 2)
                    },
                    {
                        name: 'Energy comsumption',
                        data: this.transformValues(this.props.consumptions)
                    }
                ]
            }
        }

    }

    transformValues(values, mod = 1) {
        let returnvalues = []
        let counter = 0
        values.forEach(function(v){
            if (counter%mod === 0) {
                returnvalues.push([Number(v.x) * 1000, v.y])
            }
            counter++
        })
        return returnvalues
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
