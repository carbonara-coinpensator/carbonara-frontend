'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _CarbonaraCalculator = require('../components/CarbonaraCalculator');

var _CarbonaraCalculator2 = _interopRequireDefault(_CarbonaraCalculator);

var _testAction2 = require('../actions/testAction');

var _testAction3 = _interopRequireDefault(_testAction2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        testAction: function testAction(payload) {
            return dispatch((0, _testAction3.default)(payload));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CarbonaraCalculator2.default);