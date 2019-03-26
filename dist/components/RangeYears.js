'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRange = require('react-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeYears = function (_Component) {
    _inherits(RangeYears, _Component);

    function RangeYears() {
        var _ref;

        _classCallCheck(this, RangeYears);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = RangeYears.__proto__ || Object.getPrototypeOf(RangeYears)).call.apply(_ref, [this].concat(props)));

        _this.onChange = _this.onChange.bind(_this);
        _this.state = {
            selectedYearValues: _this.props.selectedYearValues
        };

        return _this;
    }

    _createClass(RangeYears, [{
        key: 'onChange',
        value: function onChange(selectedYearValues) {
            this.setState({ selectedYearValues: selectedYearValues });
            this.props.onYearsChange(selectedYearValues);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var years = this.props.years;
            var selectedYearValues = this.props.selectedYearValues;

            var MIN = Number(years[0]);
            var MAX = Number(years[years.length - 1]);
            var STEP = 1;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'uk-margin-medium-bottom uk-text-center' },
                    _react2.default.createElement(
                        'span',
                        { className: 'uk-label uk-label-primary' },
                        'Year: ',
                        selectedYearValues[0]
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            height: '300px',
                            flexDirection: 'column'
                        }
                    },
                    _react2.default.createElement(_reactRange.Range, {
                        direction: _reactRange.Direction.Up,
                        values: selectedYearValues,
                        step: STEP,
                        min: MIN,
                        max: MAX,
                        onChange: function onChange(selectedYearValues) {
                            return _this2.onChange(selectedYearValues);
                        },
                        renderTrack: function renderTrack(_ref2) {
                            var props = _ref2.props,
                                children = _ref2.children;
                            return _react2.default.createElement(
                                'div',
                                {
                                    onMouseDown: props.onMouseDown,
                                    onTouchStart: props.onTouchStart,
                                    style: _extends({}, props.style, {
                                        flexGrow: 1,
                                        width: '32px',
                                        marginLeft: '32px',
                                        display: 'flex',
                                        height: '300px'
                                    })
                                },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        ref: props.ref,
                                        style: {
                                            width: '3px',
                                            height: '300px',
                                            borderRadius: '4px',
                                            background: (0, _reactRange.getTrackBackground)({
                                                values: selectedYearValues,
                                                colors: ['rgb(51,102,0)', '#ccc'],
                                                min: MIN,
                                                max: MAX,
                                                direction: _reactRange.Direction.Up
                                            }),
                                            alignSelf: 'center'
                                        }
                                    },
                                    children
                                )
                            );
                        },
                        renderThumb: function renderThumb(_ref3) {
                            var props = _ref3.props,
                                isDragged = _ref3.isDragged;
                            return _react2.default.createElement(
                                'div',
                                _extends({}, props, {
                                    style: _extends({}, props.style, {
                                        height: '32px',
                                        width: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0px 0px 4px #999'
                                    })
                                }),
                                _react2.default.createElement('div', {
                                    style: {
                                        width: '16px',
                                        height: '3px',
                                        backgroundColor: isDragged ? 'rgb(51,102,0)' : '#CCC'
                                    }
                                })
                            );
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'uk-margin-top uk-text-center uk-text-small' },
                    'Mining Hardware Production Standard'
                )
            );
        }
    }]);

    return RangeYears;
}(_react.Component);

exports.default = RangeYears;