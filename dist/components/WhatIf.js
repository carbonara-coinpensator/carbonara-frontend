'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WorldMap = require('./WorldMap');

var _WorldMap2 = _interopRequireDefault(_WorldMap);

var _RangeYears = require('./RangeYears');

var _RangeYears2 = _interopRequireDefault(_RangeYears);

var _RangeRegions = require('./RangeRegions');

var _RangeRegions2 = _interopRequireDefault(_RangeRegions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WhatIf = function (_Component) {
    _inherits(WhatIf, _Component);

    function WhatIf() {
        var _ref;

        _classCallCheck(this, WhatIf);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = WhatIf.__proto__ || Object.getPrototypeOf(WhatIf)).call.apply(_ref, [this].concat(props)));

        _this.calculateEmissionsSum = _this.calculateEmissionsSum.bind(_this);
        _this.calculateEmissionsPercentFromProps = _this.calculateEmissionsPercentFromProps.bind(_this);
        _this.calculateEmissionsPercentFromRegionButtons = _this.calculateEmissionsPercentFromRegionButtons.bind(_this);
        _this.calculateRegionButtons = _this.calculateRegionButtons.bind(_this);
        _this.handleRegionsChange = _this.handleRegionsChange.bind(_this);
        _this.handleYearsChange = _this.handleYearsChange.bind(_this);

        _this.state = {
            emissions: _this.props.emissions,
            emissionsSum: _this.calculateEmissionsSum(),
            emissionsPercent: _this.calculateEmissionsPercentFromProps(),
            regionButtons: _this.calculateRegionButtons(),
            regionCodes: _this.props.regions,
            selectedYearValues: [_this.props.years.sort()[_this.props.years.length - 1]]
        };

        return _this;
    }

    // calculate the sum of all emissions given in props


    _createClass(WhatIf, [{
        key: 'calculateEmissionsSum',
        value: function calculateEmissionsSum() {

            var emissionsSum = 0;

            this.props.emissions.forEach(function (v, k) {
                emissionsSum += Number(v);
            });

            return emissionsSum;
        }

        // calculate percentage values of emissions
        // based on emissions props

    }, {
        key: 'calculateEmissionsPercentFromProps',
        value: function calculateEmissionsPercentFromProps(regionButtons) {

            var emissionsPercent = [];
            var emissionsSum = this.calculateEmissionsSum();

            this.props.emissions.forEach(function (v, k) {
                emissionsPercent.push(Number(v) / emissionsSum * 100);
            });

            return emissionsPercent;
        }

        // calculate percentage values of emissions
        // based on regionButtons (set via handleRegionsChange from child component)

    }, {
        key: 'calculateEmissionsPercentFromRegionButtons',
        value: function calculateEmissionsPercentFromRegionButtons(regionButtons) {

            var emissionsSum = this.state.emissionsSum;
            var emissionsPercent = [];
            var thisNumber = 0;

            // calculate percentage of track area controlled by button
            regionButtons.forEach(function (v, k) {
                var lastNumber = thisNumber;
                thisNumber = Number(v) / emissionsSum * 100;
                emissionsPercent.push(thisNumber - lastNumber);
            });

            // add a last value to complete 100% of track area
            emissionsPercent.push(100 - thisNumber);

            // update state
            this.setState({ emissionsPercent: emissionsPercent });

            return emissionsPercent;
        }

        // child component sends regionButtons array here

    }, {
        key: 'handleRegionsChange',
        value: function handleRegionsChange(regionButtons) {
            // set state
            this.setState({ regionButtons: regionButtons });
            // set emission percentages based on button values
            this.calculateEmissionsPercentFromRegionButtons(regionButtons);
            this.props.onWhatifChange();
        }
    }, {
        key: 'handleYearsChange',
        value: function handleYearsChange(selectedYearValues) {
            this.setState({ selectedYearValues: selectedYearValues });
            this.props.onWhatifChange();
        }

        // set regionButtons positions based on emissions prop values

    }, {
        key: 'calculateRegionButtons',
        value: function calculateRegionButtons() {

            // array for region buttons
            var regionButtons = [];

            // every buttons adds up the value of previous button
            var emissionsAdd = 0;
            this.props.emissions.forEach(function (v, k) {
                emissionsAdd += Number(v);
                regionButtons.push(emissionsAdd);
            });

            // last button does not exist (since we have 1 button less than percent values which are controlled by them)
            regionButtons.pop();

            // set buttons
            return regionButtons;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {

            var years = this.props.years.sort();
            var selectedYearValues = this.state.selectedYearValues;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { 'uk-grid': '', className: '' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-5-6' },
                        _react2.default.createElement(_WorldMap2.default, { emissionsPercent: this.state.emissionsPercent }),
                        _react2.default.createElement(_RangeRegions2.default, { onRegionsChange: this.handleRegionsChange, regionButtons: this.state.regionButtons, regionCodes: this.state.regionCodes, emissionsPercent: this.state.emissionsPercent })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-6' },
                        _react2.default.createElement(_RangeYears2.default, { onYearsChange: this.handleYearsChange, years: years, selectedYearValues: selectedYearValues })
                    )
                )
            );
        }
    }]);

    return WhatIf;
}(_react.Component);

exports.default = WhatIf;