'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSimpleMaps = require('react-simple-maps');

var _RegionInfos = require('./RegionInfos');

var _RegionInfos2 = _interopRequireDefault(_RegionInfos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto"
};

var WorldMap = function (_Component) {
    _inherits(WorldMap, _Component);

    function WorldMap() {
        var _ref;

        _classCallCheck(this, WorldMap);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = WorldMap.__proto__ || Object.getPrototypeOf(WorldMap)).call.apply(_ref, [this].concat(props)));

        _this.state = {
            regions: _RegionInfos2.default
        };

        return _this;
    }

    _createClass(WorldMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { style: wrapperStyles },
                _react2.default.createElement(
                    _reactSimpleMaps.ComposableMap,
                    {
                        projectionConfig: { scale: 205 },
                        width: 980,
                        height: 551,
                        style: {
                            width: "100%",
                            height: "auto"
                        }
                    },
                    _react2.default.createElement(
                        _reactSimpleMaps.ZoomableGroup,
                        { center: [0, 20], disablePanning: true },
                        _react2.default.createElement(
                            _reactSimpleMaps.Geographies,
                            { geography: '/src/assets/ne_110m_land.topojson' },
                            function (geographies, projection) {
                                return geographies.map(function (geography, i) {
                                    return geography.id !== "ATA" && _react2.default.createElement(_reactSimpleMaps.Geography, {
                                        key: i,
                                        geography: geography,
                                        projection: projection,
                                        style: {
                                            default: {
                                                fill: "#eee",
                                                stroke: "#ccc",
                                                strokeWidth: 0.75,
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "#f2f2f2",
                                                stroke: "#ddd",
                                                strokeWidth: 0.75,
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: "#fff",
                                                stroke: "#eee",
                                                strokeWidth: 0.75,
                                                outline: "none"
                                            }
                                        }
                                    });
                                });
                            }
                        ),
                        _react2.default.createElement(
                            _reactSimpleMaps.Markers,
                            null,
                            this.state.regions.map(function (region, i) {
                                return _react2.default.createElement(
                                    _reactSimpleMaps.Marker,
                                    { key: i, marker: region },
                                    _react2.default.createElement('circle', {
                                        cx: 0,
                                        cy: 0,
                                        r: _this2.props.emissionsPercent[i],
                                        fill: region.color,
                                        stroke: 'white',
                                        strokeWidth: '1'
                                    })
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return WorldMap;
}(_react.Component);

exports.default = WorldMap;