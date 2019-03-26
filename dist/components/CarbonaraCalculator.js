'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('react-dates/initialize');

require('react-dates/lib/css/_datepicker.css');

var _reactDates = require('react-dates');

var _reactUikitTable = require('react-uikit-table');

var _reactUikitTable2 = _interopRequireDefault(_reactUikitTable);

var _materialTable = require('material-table');

var _materialTable2 = _interopRequireDefault(_materialTable);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _ResultSection = require('./ResultSection');

var _ResultSection2 = _interopRequireDefault(_ResultSection);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _ConsumptionGraph = require('./ConsumptionGraph');

var _ConsumptionGraph2 = _interopRequireDefault(_ConsumptionGraph);

var _WhatIf = require('./WhatIf');

var _WhatIf2 = _interopRequireDefault(_WhatIf);

var _uikit = require('uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _uikitIcons = require('uikit/dist/js/uikit-icons');

var _uikitIcons2 = _interopRequireDefault(_uikitIcons);

require('../scss/css.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_uikit2.default.use(_uikitIcons2.default);

var CarbonaraCalculator = function (_Component) {
    _inherits(CarbonaraCalculator, _Component);

    function CarbonaraCalculator() {
        var _ref;

        _classCallCheck(this, CarbonaraCalculator);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = CarbonaraCalculator.__proto__ || Object.getPrototypeOf(CarbonaraCalculator)).call.apply(_ref, [this].concat(props)));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.validateField = _this.validateField.bind(_this);
        _this.validateForms = _this.validateForms.bind(_this);
        _this.validateWalletForm = _this.validateWalletForm.bind(_this);
        _this.validateTransactionForm = _this.validateTransactionForm.bind(_this);
        _this.submitForm = _this.submitForm.bind(_this);
        _this.getTransactions = _this.getTransactions.bind(_this);
        _this.calculateEmission = _this.calculateEmission.bind(_this);
        _this.fillInTransactionId = _this.fillInTransactionId.bind(_this);
        _this.getChartData = _this.getChartData.bind(_this);
        _this.activateGamificationResults = _this.activateGamificationResults.bind(_this);

        // this.onChangeDateRange = this.onChangeDateRange.bind(this)
        // this.getMiningGearYears = this.getMiningGearYears.bind(this)

        _this.state = {

            address: '',

            addressValidity: {
                wallet: false,
                transaction: false,
                some: false
            },

            formValidity: {
                wallet: false,
                transaction: false
            },

            startDate: null,
            endDate: null,

            dateRangeValid: false,

            transactions: [],
            years: [],
            regions: [],
            emissionsPerRegion: [],
            chart: {},

            focusedInput: null,
            emissionsResult: 0,

            showGamificationResults: false,
            gamificationResult: 0

        };

        return _this;
    }

    _createClass(CarbonaraCalculator, [{
        key: 'handleChange',
        value: function handleChange(event) {
            var _this2 = this;

            var name = event.target.name;
            var value = event.target.value;

            this.setState(_defineProperty({}, name, value), function () {
                _this2.validateField(name, value);
            });
        }
    }, {
        key: 'validateField',
        value: function validateField(fieldName, value) {
            var _this3 = this;

            var walletAddressValid = this.state.addressValidity.wallet;
            var transactionIdValid = this.state.addressValidity.transaction;

            switch (fieldName) {
                case 'address':
                    walletAddressValid = value.length == 34;
                    transactionIdValid = value.length == 64;
            }

            this.setState({
                addressValidity: {
                    wallet: walletAddressValid,
                    transaction: transactionIdValid,
                    some: walletAddressValid || transactionIdValid
                }

            }, function () {
                return _this3.validateForms();
            });
        }
    }, {
        key: 'validateForms',
        value: function validateForms() {
            if (this.state.addressValidity.wallet) {
                this.validateWalletForm();
            }
            if (this.state.addressValidity.transaction) {
                this.validateTransactionForm();
            }
        }
    }, {
        key: 'validateWalletForm',
        value: function validateWalletForm() {
            var walletFormValid = this.state.addressValidity.wallet;
            this.setState({ formValidity: { wallet: walletFormValid } });
        }
    }, {
        key: 'validateTransactionForm',
        value: function validateTransactionForm() {
            var transactionFormValid = this.state.addressValidity.transaction;
            this.setState({ formValidity: { transaction: transactionFormValid } });
        }
    }, {
        key: 'submitForm',
        value: function submitForm(e) {
            e.preventDefault();
            if (this.state.addressValidity.wallet) {
                this.getTransactions(e);
            }
            if (this.state.addressValidity.transaction) {
                this.calculateEmission(e);
            }
        }
    }, {
        key: 'getTransactions',
        value: function getTransactions(e) {
            var _this4 = this;

            _uikit2.default.notification('<div uk-spinner=""></div> Getting transactions …', { status: 'primary' });
            _api2.default.get('api/Carbonara/TransactionList?BitcoinAddress=' + this.state.address).then(function (res) {
                res.data.forEach(function (v, k) {
                    v.time = _moment2.default.unix(v.time).format();
                });
                _this4.setState({ transactions: res.data });
                _uikit2.default.notification.closeAll();
            });
        }
    }, {
        key: 'calculateEmission',
        value: function calculateEmission(e) {
            var _this5 = this;

            _uikit2.default.notification('<div uk-spinner=""></div> Calculating emissions …', { status: 'primary' });
            _api2.default.get('api/Carbonara/Calculation?TxHash=' + this.state.address).then(function (res) {

                var emissionsResult = 0;
                var regions = [];
                var emissionsPerRegion = [];
                res.data.averageEmissionPerCountry.forEach(function (v, k) {
                    regions.push(v.countryCode);
                    emissionsPerRegion.push(v.co2Emission.toFixed(2));
                    if (v.countryCode == 'US') {
                        emissionsResult = v.co2Emission;
                    }
                });
                _this5.setState({ emissionsResult: emissionsResult.toFixed(2) });
                _this5.setState({ regions: regions });
                _this5.setState({ emissionsPerRegion: emissionsPerRegion });

                var years = [];
                Object.keys(res.data.calculationPerYear).map(function (k, v) {
                    return years.push(k);
                });
                _this5.setState({ years: years });

                _uikit2.default.notification.closeAll();
            });
        }
    }, {
        key: 'fillInTransactionId',
        value: function fillInTransactionId(e, transaction) {
            e.preventDefault();
            this.handleChange(e);
            this.setState({
                addressValidity: {
                    wallet: false,
                    transaction: true,
                    some: true
                },
                address: transaction.txid
            });
        }
    }, {
        key: 'getChartData',
        value: function getChartData() {
            var _this6 = this;

            _uikit2.default.notification('<div uk-spinner=""></div> Getting chart data …', { status: 'primary' });
            _api2.default.get('api/Carbonara/Charts').then(function (res) {
                _this6.setState({ chart: res.data });
                _uikit2.default.notification.closeAll();
            });
        }
    }, {
        key: 'activateGamificationResults',
        value: function activateGamificationResults() {
            this.setState({ showGamificationResults: true });
        }

        /*onChangeDateRange(startDate, endDate) {
            this.setState({
                startDate: startDate,
                endDate: endDate,
                dateRangeValid: true
            });
            if (startDate && endDate) {
                this.validateWalletForm();
            }
        }*/

        /*getMiningGearYears() {
            API.get('api/Carbonara/MinningGearYearsSelection').then(res => {
                this.setState({ years: res.data });
            });
        }*/

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getChartData();
            // UIkit.scroll(e.target)
            // this.getMiningGearYears()
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'scrollTo',
        value: function scrollTo(e) {
            var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            e.preventDefault();
            if (hash == '' && e.target.hash) {
                hash = e.target.hash;
            }
            _uikit2.default.scroll(e.target).scrollTo(hash);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this,
                _React$createElement;

            var showTransactions = this.state.transactions.length > 0 && this.state.formValidity.wallet;
            var showResults = this.state.emissionsResult > 0;
            var showGamification = this.state.years.length > 0 && this.state.regions.length > 0 && this.state.emissionsPerRegion.length > 0;
            var showGamificationResults = this.state.showGamificationResults;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navigation2.default, null),
                'priceChart' in this.state.chart && 'co2EmissionChart' in this.state.chart && _react2.default.createElement(
                    'section',
                    { id: 'graph', className: 'uk-flex uk-flex-middle uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default', 'uk-scrollspy': 'cls:uk-animation-fade' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-container' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'BTC Price and Energy Consumption'
                            ),
                            _react2.default.createElement(_ConsumptionGraph2.default, { className: 'uk-margin-top', prices: this.state.chart.priceChart, consumptions: this.state.chart.co2EmissionChart })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-position-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-container' },
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement('div', { className: 'uk-width-1-3' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-2-3' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-button-group uk-margin-large-bottom' },
                                            _react2.default.createElement('div', { className: 'uk-width-1-2' }),
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-primary uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#calculate');
                                                    } },
                                                'How green is my BTC Wallet? ',
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-down' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { id: 'calculate', className: 'uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary', 'uk-scrollspy': 'cls:uk-animation-fade' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-container' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'How ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'green'
                                ),
                                ' is my BTC Wallet?'
                            ),
                            _react2.default.createElement(
                                'form',
                                { onSubmit: this.submitForm, className: 'uk-margin-large-top' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'uk-margin' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'uk-form-label', htmlFor: 'address' },
                                        'Wallet Address or Transaction ID'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-form-controls' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-grid-collapse' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'uk-width-4-5' },
                                                _react2.default.createElement('input', { className: 'uk-input uk-form-large',
                                                    id: 'address',
                                                    type: 'text',
                                                    name: 'address',
                                                    placeholder: 'Wallet Address or Transaction ID',
                                                    value: this.state.address,
                                                    onChange: function onChange(event) {
                                                        return _this7.handleChange(event);
                                                    },
                                                    autoFocus: true
                                                })
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'uk-width-1-5' },
                                                _react2.default.createElement(
                                                    'button',
                                                    (_React$createElement = { type: 'submit', className: 'uk-width-1-1 uk-button uk-button-large' + (!this.state.addressValidity.some ? ' uk-button-default' : ' uk-button-primary') }, _defineProperty(_React$createElement, 'type', 'submit'), _defineProperty(_React$createElement, 'disabled', !this.state.addressValidity.some), _React$createElement),
                                                    'Calculate'
                                                )
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-1-1' },
                                        showTransactions && _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'label',
                                                { className: 'uk-form-label' },
                                                'Please select a transaction'
                                            ),
                                            _react2.default.createElement('br', null),
                                            _react2.default.createElement(_materialTable2.default, {
                                                columns: [{ title: 'time', field: 'time', defaultSort: 'desc' }, { title: 'txid', field: 'txid' }, { title: 'value', field: 'value', type: 'numeric' }],
                                                data: this.state.transactions,
                                                options: { pageSize: 5 },
                                                title: 'Transactions',
                                                actions: [{
                                                    icon: 'file_copy',
                                                    tooltip: 'select this transaction',
                                                    onClick: function onClick(event, rowData) {
                                                        _this7.fillInTransactionId(event, rowData);
                                                    }
                                                }]
                                            })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-text-small' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Example Wallet Address: ',
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement(
                                        'code',
                                        null,
                                        '1Ma2DrB78K7jmAwaomqZNRMCvgQrNjE2QC'
                                    )
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Example Transaction ID: ',
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement(
                                        'code',
                                        null,
                                        'e87f138c9ebf5986151667719825c28458a28cc66f69fed4f1032a93b399fdf8'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-position-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-container' },
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement('div', { className: 'uk-width-1-3' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-2-3' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-button-group uk-margin-large-bottom' },
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-default uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#graph');
                                                    } },
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-up' }),
                                                ' BTC Price and Energy Consumption'
                                            ),
                                            showResults && _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-primary uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#results');
                                                    } },
                                                'Calculation Result ',
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-down' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                showResults && _react2.default.createElement(
                    'section',
                    { id: 'results', className: 'uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-secondary', 'uk-scrollspy': 'cls:uk-animation-fade' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-container' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Calculation Result'
                            ),
                            _react2.default.createElement(_ResultSection2.default, { label: 'Result', color: 'secondary', result: this.state.emissionsResult })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-position-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-container' },
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement('div', { className: 'uk-width-1-3' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-2-3' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-button-group uk-margin-large-bottom' },
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-default uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#calculate');
                                                    } },
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-up' }),
                                                ' How green is my BTC Wallet?'
                                            ),
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-primary uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#gamification');
                                                    } },
                                                'What if \u2026 ',
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-down' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                showGamification && _react2.default.createElement(
                    'section',
                    { id: 'gamification', className: 'uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-default', 'uk-scrollspy': 'cls:uk-animation-fade' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-container' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'What if \u2026'
                            ),
                            _react2.default.createElement(_WhatIf2.default, { years: this.state.years, regions: this.state.regions, emissions: this.state.emissionsPerRegion, onWhatifChange: this.activateGamificationResults })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-position-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-container' },
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement('div', { className: 'uk-width-1-3' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-2-3' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-button-group uk-margin-large-bottom' },
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-default uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#results');
                                                    } },
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-up' }),
                                                ' Calculation Result'
                                            ),
                                            showGamificationResults && _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-primary uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#gamificationresults');
                                                    } },
                                                'View Result ',
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-down' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                showGamificationResults && _react2.default.createElement(
                    'section',
                    { id: 'gamificationresults', className: 'uk-position-relative uk-height-viewport uk-section uk-section-large uk-section-primary', 'uk-scrollspy': 'cls:uk-animation-fade' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-1' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-container' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Result'
                            ),
                            _react2.default.createElement(_ResultSection2.default, { label: 'Better result', color: 'primary', result: this.state.emissionsResult })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-position-bottom' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-container' },
                                _react2.default.createElement(
                                    'div',
                                    { 'uk-grid': '' },
                                    _react2.default.createElement('div', { className: 'uk-width-1-3' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-width-2-3' },
                                        _react2.default.createElement(
                                            'div',
                                            { 'uk-grid': '', className: 'uk-button-group uk-margin-large-bottom' },
                                            _react2.default.createElement('div', { className: 'uk-width-1-2' }),
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'uk-width-1-2 uk-button uk-button-primary uk-button-large', onClick: function onClick() {
                                                        return _this7.scrollTo(event, '#gamification');
                                                    } },
                                                _react2.default.createElement('span', { 'uk-icon': 'arrow-up' }),
                                                ' What if \u2026'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CarbonaraCalculator;
}(_react.Component);

exports.default = CarbonaraCalculator;