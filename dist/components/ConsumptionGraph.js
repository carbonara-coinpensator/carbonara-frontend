'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApexcharts = require('react-apexcharts');

var _reactApexcharts2 = _interopRequireDefault(_reactApexcharts);

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsumptionGraph = function (_Component) {
    _inherits(ConsumptionGraph, _Component);

    function ConsumptionGraph() {
        var _ref;

        _classCallCheck(this, ConsumptionGraph);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ConsumptionGraph.__proto__ || Object.getPrototypeOf(ConsumptionGraph)).call.apply(_ref, [this].concat(props)));

        _this.state = {
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
                        dashArray: 0
                    }
                },
                series: [{
                    name: 'BTC price',
                    data: [30, 40, 45, 50, 49, 60, 50, 20, 90, 70]
                }, {
                    name: 'Energy comsumption',
                    data: [50, 70, 55, 60, 50, 50, 50, 40, 60, 50]
                }]
            }
        };

        return _this;
    }

    _createClass(ConsumptionGraph, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactApexcharts2.default, { options: this.state.chart.options, series: this.state.chart.series, type: 'line', width: '100%', height: 350 })
            );
        }
    }]);

    return ConsumptionGraph;
}(_react.Component);

exports.default = ConsumptionGraph;