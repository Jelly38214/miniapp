"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userApi = require("./user.api.js");

Object.keys(_userApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userApi[key];
    }
  });
});