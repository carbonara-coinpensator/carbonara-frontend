'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _carbonaraLogo = require('../assets/carbonara-logo.png');

var _carbonaraLogo2 = _interopRequireDefault(_carbonaraLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function Navigation() {
    return _react2.default.createElement(
        'nav',
        { className: 'uk-navbar-container uk-navbar-transparent uk-light uk-width-1-1 uk-position-absolute uk-position-top' },
        _react2.default.createElement(
            'div',
            { className: 'uk-container uk-container-expand' },
            _react2.default.createElement(
                'div',
                { 'uk-navbar': '' },
                _react2.default.createElement(
                    'div',
                    { className: 'uk-navbar-center' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-navbar-center-left' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'ul',
                                { className: 'uk-navbar-nav' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'uk-active' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#' },
                                        'Calculator'
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'uk-navbar-item uk-logo', href: '#' },
                        _react2.default.createElement('img', { width: '200', src: _carbonaraLogo2.default })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-navbar-center-right' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'ul',
                                { className: 'uk-navbar-nav' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#' },
                                        'Greenpaper'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

exports.default = Navigation;