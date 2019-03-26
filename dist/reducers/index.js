'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case 'calculate':
      return {
        testActionProp: action.payload
      };
    default:
      return state;
  }
};