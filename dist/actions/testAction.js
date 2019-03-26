'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var testAction = function testAction(payload) {
  console.log(payload);
  return {
    type: 'calculate',
    payload: payload
  };
};
exports.default = testAction;