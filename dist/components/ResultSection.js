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
            label: 'Result'
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
                    { 'uk-grid': '' },
                    _react2.default.createElement('div', { className: 'uk-width-1-2' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2' },
                        _react2.default.createElement(
                            'p',
                            { className: 'uk-text-muted' },
                            'correspond to'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { 'uk-grid': '', 'uk-height-match': '.uk-card-media-top', className: 'uk-flex uk-flex-middle' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-2' },
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
                        ),
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
                        { className: 'uk-width-1-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-card' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-card-media-top' },
                                _react2.default.createElement('img', { className: 'uk-height-small uk-margin-medium-left', src: _car2.default })
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
                                        this.props.result * 6,
                                        ' km'
                                    ),
                                    ' ',
                                    _react2.default.createElement('br', null),
                                    'driven by car'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-width-1-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-card' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uk-card-media-top' },
                                _react2.default.createElement('img', { className: 'uk-height-small uk-margin-medium-left', src: _tree2.default })
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
                                        Math.round(this.props.result * 30 / 365),
                                        ' years'
                                    ),
                                    ' of CO',
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
            );
        }
    }]);

    return ResultSection;
}(_react.Component);

exports.default = ResultSection;