'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _car = require('../assets/car.svg');

var _car2 = _interopRequireDefault(_car);

var _tree = require('../assets/tree.svg');

var _tree2 = _interopRequireDefault(_tree);

var _logoNaturefund = require('../assets/logo-naturefund.png');

var _logoNaturefund2 = _interopRequireDefault(_logoNaturefund);

var _logoPlanet = require('../assets/logo-planet.svg');

var _logoPlanet2 = _interopRequireDefault(_logoPlanet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultSection = function (_Component) {
    _inherits(ResultSection, _Component);

    function ResultSection() {
        var _ref;

        _classCallCheck(this, ResultSection);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ResultSection.__proto__ || Object.getPrototypeOf(ResultSection)).call.apply(_ref, [this].concat(props)));

        _this.state = {
            color: 'secondary',
            result: 0,
            label: 'Result',
            kilometersDrivenByCar: Math.round(_this.props.result * 6),
            yearsOfCo2Sequestration: Math.round(_this.props.result * 30 / 365)
        };
        return _this;
    }

    _createClass(ResultSection, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { 'uk-grid': '', className: 'uk-flex uk-flex-bottom' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2 uk-text-right' },
                        _react2.default.createElement(
                            'p',
                            { className: 'uk-text-muted' },
                            'CO',
                            _react2.default.createElement(
                                'sub',
                                null,
                                '2'
                            ),
                            ' emissions'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2 uk-text-left' },
                        _react2.default.createElement(
                            'p',
                            { className: 'uk-text-muted' },
                            'correspond to:'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { 'uk-grid': '', className: 'uk-flex uk-flex-middle uk-grid-divider',
                        'uk-sticky': 'animation: uk-animation-slide-top; cls-active: calculation-results-active;' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2 uk-text-right' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'uk-text-huge' },
                            this.props.result,
                            ' ',
                            _react2.default.createElement(
                                'small',
                                null,
                                'kg'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2' },
                        _react2.default.createElement(
                            'div',
                            { 'uk-grid': '', className: 'uk-grid-collapse', 'uk-height-match': '.uk-card-media-top' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-width-1-2' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'uk-card uk-card-small' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-card-media-top' },
                                        _react2.default.createElement('img', { className: 'uk-height-small', src: _car2.default })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-card-body' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'uk-card-title' },
                                            _react2.default.createElement(
                                                'strong',
                                                null,
                                                this.state.kilometersDrivenByCar,
                                                '\xA0km'
                                            ),
                                            ' ',
                                            _react2.default.createElement('br', null),
                                            'driven by\xA0car'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-width-1-2' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'uk-card uk-card-small' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-card-media-top' },
                                        _react2.default.createElement('img', { className: 'uk-height-small', src: _tree2.default })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'uk-card-body' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'uk-card-title' },
                                            _react2.default.createElement(
                                                'strong',
                                                null,
                                                this.state.yearsOfCo2Sequestration,
                                                '\xA0years'
                                            ),
                                            ' of\xA0CO',
                                            _react2.default.createElement(
                                                'sub',
                                                null,
                                                '2'
                                            ),
                                            ' ',
                                            _react2.default.createElement('br', null),
                                            'sequestration'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'uk-margin-large-top', 'uk-height-match': '.uk-card' },
                    _react2.default.createElement(
                        'h3',
                        { className: '' },
                        'Here are some compensation options for you:'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-child-width-1-6 uk-light uk-flex uk-flex-center', 'uk-grid': '', 'uk-height-match': '.img' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-card uk-card-default uk-card-small' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'uk-card-body' },
                                    _react2.default.createElement(
                                        'a',
                                        { className: '', target: '_blank', href: 'https://www.naturefund.de/wissen/co2_rechner/' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'img uk-flex uk-flex-middle' },
                                            _react2.default.createElement('img', { src: _logoNaturefund2.default })
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Nature Fund'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-card uk-card-default uk-card-small' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'uk-card-body' },
                                    _react2.default.createElement(
                                        'a',
                                        { className: '', target: '_blank', href: 'https://www.plant-for-the-planet.org/de/startseite' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'img uk-flex uk-flex-middle' },
                                            _react2.default.createElement('img', { src: _logoPlanet2.default })
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Plant for the Planet'
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

    return ResultSection;
}(_react.Component);

exports.default = ResultSection;