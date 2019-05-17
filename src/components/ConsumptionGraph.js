import React, { Component } from 'react'
import Chart from 'react-apexcharts'

class ConsumptionGraph extends Component {

    constructor(...props) {

        super(...props)
        this.state = {
            options: {
                colors: ['#14121D', '#ff5500'],
                chart: {
                    id: 'priceandconsumption',
                    fontFamily: '"Encode Sans", Helvetica, Arial, sans-serif',
                    foreColor: '#484260',
                    selection: {
                        enabled: false,
                        type: 'x',
                        fill: {
                          color: '#484260',
                          opacity: 0.1
                        },
                        stroke: {
                          width: 1,
                          dashArray: 3,
                          color: '#484260',
                          opacity: 0.4
                        },
                        xaxis: {
                          min: undefined,
                          max: undefined
                        },
                        yaxis: {
                          min: undefined,
                          max: undefined
                        }
                    },
                    toolbar: {
                    show: true,
                        tools: {
                            download: false,
                            selection: false,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom'
                    },
                },
                grid: {
                    show: true,
                    borderColor: '#f2f2f2',
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [
                    {
                        // opposite: true,
                        title: {
                            text: 'BTC price [US$]'
                        },
                        labels: {
                            formatter: (value) => { return value.toLocaleString(navigator.language, {minimumFractionDigits: 0}) }
                        }
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Energy Comsumption [kWh]'
                        },
                        labels: {
                            formatter: (value) => { return value.toLocaleString(navigator.language, {minimumFractionDigits: 0}) }
                        },
                        // min: 0,
                        // max: 600,
                        // forceNiceScale: true,
                    }
                ],
                stroke: {
                    show: true,
                    curve: 'straight',
                    lineCap: 'square',
                    width: 2,
                },
                legend: {
                    show: true,
                    horizontalAlign: 'center',
                    position: 'bottom',
                    itemMargin: {
                        horizontal: 5,
                        vertical: 10
                    }
                },

            },
            series: [
                {
                    name: 'BTC price [US$]',
                    data: this.transformValues(this.props.prices, 4, 1)
                },
                {
                    name: 'Energy Comsumption [kWh]',
                    data: this.transformValues(this.props.consumptions, 1, 10)
                }
            ]
        }

    }

    transformValues(values, mod = 1, miny = -1) {
        let returnvalues = []
        let counter = 0
        values.forEach(function(v){
            if (counter%mod === 0 && v.y > miny) {
                returnvalues.push([Number(v.x) * 1000, v.y.toFixed(0)])
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
                <Chart options={this.state.options} series={this.state.series} type="line" width="100%" height={(window.innerHeight/2)} />
            </div>
        )
    }

}

export default ConsumptionGraph
