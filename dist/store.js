"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reducers = require("./reducers/");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { testActionProp: true };

  return (0, _redux.createStore)(_reducers2.default, state);
}

exports.default = configureStore;