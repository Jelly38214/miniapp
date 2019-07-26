"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userStore = require("./user.store.js");

var _userStore2 = _interopRequireDefault(_userStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  UserStore: _userStore2.default
}; /**
    * 所有使用的store，都需要在这里进行引入
    */