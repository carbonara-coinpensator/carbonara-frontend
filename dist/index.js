'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Counter = exports.doDecrement = exports.doIncrement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var doIncrement = exports.doIncrement = function doIncrement(prevState) {
    return {
        counter: prevState.counter + 1
    };
};

var doDecrement = exports.doDecrement = function doDecrement(prevState) {
    return {
        counter: prevState.counter - 1
    };
};

var CarbonaraWidget = function (_Component) {
    _inherits(CarbonaraWidget, _Component);

    function CarbonaraWidget() {
        _classCallCheck(this, CarbonaraWidget);

        var _this = _possibleConstructorReturn(this, (CarbonaraWidget.__proto__ || Object.getPrototypeOf(CarbonaraWidget)).call(this));

        _this.state = {
            counter: 0,
            persons: [],
            name: ''
        };

        _this.onIncrement = _this.onIncrement.bind(_this);
        _this.onDecrement = _this.onDecrement.bind(_this);

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(CarbonaraWidget, [{
        key: 'onIncrement',
        value: function onIncrement() {
            this.setState(doIncrement);
        }
    }, {
        key: 'onDecrement',
        value: function onDecrement() {
            this.setState(doDecrement);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ name: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var user = {
                name: this.state.name
            };

            _api2.default.post('https://jsonplaceholder.typicode.com/users', { user: user }).then(function (res) {
                console.log(res);
                console.log(res.data);
            });
        }

        //https://alligator.io/react/axios-react/

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _api2.default.get('https://jsonplaceholder.typicode.com/users').then(function (res) {
                var persons = res.data;
                _this2.setState({ persons: persons });
                console.log(persons);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var counter = this.state.counter;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Carbonara Widget test'
                ),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        'label',
                        null,
                        'New Person Name:\xA0',
                        _react2.default.createElement('input', { type: 'text', name: 'name', onChange: this.handleChange })
                    ),
                    '\xA0',
                    _react2.default.createElement(
                        'button',
                        { type: 'submit' },
                        'Add'
                    )
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Dummy Field'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { type: 'text',
                        name: 'walletaddress',
                        placeholder: 'Wallet Address' })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Dummy Field'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { type: 'date',
                        name: 'startdatetime' })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Dummy Field'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { type: 'date',
                        name: 'enddatetime' })
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    this.state.persons.map(function (person) {
                        return _react2.default.createElement(
                            'li',
                            { key: person.id },
                            person.name
                        );
                    })
                ),
                _react2.default.createElement(Counter, { counter: counter }),
                _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: this.onIncrement
                    },
                    'Increment'
                ),
                _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: this.onDecrement
                    },
                    'Decrement'
                )
            );
        }
    }]);

    return CarbonaraWidget;
}(_react.Component);

var Counter = exports.Counter = function Counter(_ref) {
    var counter = _ref.counter;
    return _react2.default.createElement(
        'p',
        null,
        counter
    );
};

exports.default = CarbonaraWidget;