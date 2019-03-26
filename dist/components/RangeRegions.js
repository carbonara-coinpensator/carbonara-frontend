'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRange = require('react-range');

var _RegionInfos = require('./RegionInfos');

var _RegionInfos2 = _interopRequireDefault(_RegionInfos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STEP = 0.1;
var MIN = 0;
var MAX = 2800;
var COLORS = ['#9CBCF8', 'red', '#276EF1', 'orange', 'green', '#0C2960'];

var RangeRegions = function (_Component) {
    _inherits(RangeRegions, _Component);

    function RangeRegions() {
        var _ref;

        _classCallCheck(this, RangeRegions);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = RangeRegions.__proto__ || Object.getPrototypeOf(RangeRegions)).call.apply(_ref, [this].concat(props)));

        _this.onChange = _this.onChange.bind(_this);
        _this.state = {
            regionButtons: _this.props.regionButtons,
            colors: []
        };

        return _this;
    }

    _createClass(RangeRegions, [{
        key: 'onChange',
        value: function onChange(regionButtons) {
            this.setState({ regionButtons: regionButtons });
            this.props.onRegionsChange(regionButtons);
        }
    }, {
        key: 'getColors',
        value: function getColors() {
            var colors = [];
            _RegionInfos2.default.forEach(function (v, k) {
                colors.push(v.color);
            });
            this.setState({ colors: colors });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getColors();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var regionButtons = this.props.regionButtons;
            var emissionsPercent = this.props.emissionsPercent;
            var colors = this.state.colors;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }
                    },
                    _react2.default.createElement(_reactRange.Range, {
                        values: regionButtons,
                        step: STEP,
                        min: MIN,
                        max: MAX,
                        onChange: function onChange(regionButtons) {
                            return _this2.onChange(regionButtons);
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
                                        height: '32px',
                                        display: 'flex',
                                        width: '100%'
                                    })
                                },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        ref: props.ref,
                                        style: {
                                            height: '3px',
                                            width: '100%',
                                            borderRadius: '4px',
                                            background: (0, _reactRange.getTrackBackground)({
                                                values: regionButtons,
                                                colors: colors,
                                                min: MIN,
                                                max: MAX
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
                                isDragged = _ref3.isDragged,
                                index = _ref3.index;
                            return _react2.default.createElement(
                                'div',
                                _extends({}, props, {
                                    style: _extends({}, props.style, {
                                        height: '32px',
                                        width: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0px 0px 4px #999'
                                    })
                                }),
                                _react2.default.createElement('div', {
                                    style: {
                                        height: '12px',
                                        width: '3px',
                                        backgroundColor: isDragged ? colors[index] : '#CCC'
                                    }
                                })
                            );
                        }
                    }),
                    _react2.default.createElement(
                        'div',
                        { 'uk-grid': '', className: 'uk-flex-center uk-margin' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[0] } },
                                'CA: ',
                                emissionsPercent[0].toFixed(1),
                                '%'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[1] } },
                                'CN: ',
                                emissionsPercent[1].toFixed(1),
                                '%'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[2] } },
                                'EU: ',
                                emissionsPercent[2].toFixed(1),
                                '%'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[3] } },
                                'JP: ',
                                emissionsPercent[3].toFixed(1),
                                '%'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[4] } },
                                'SG: ',
                                emissionsPercent[4].toFixed(1),
                                '%'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'uk-label', style: { backgroundColor: colors[5] } },
                                'US: ',
                                emissionsPercent[5].toFixed(1),
                                '%'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return RangeRegions;
}(_react.Component);

exports.default = RangeRegions;