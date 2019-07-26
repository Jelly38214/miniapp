"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.getAreaConfig = exports.getAccessToken = undefined;

var _request = require("../utils/request.js");

var _request2 = _interopRequireDefault(_request);

var _base = require("../utils/base64.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAccessToken = exports.getAccessToken = function getAccessToken(UID, SECRET) {
  var opts = {
    url: '/oauth/token',
    method: 'POST',
    params: {
      'grant_type': 'client_credentials'
    },
    header: {
      'Authorization': "Basic " + _base2.default.encode(UID + ":" + SECRET)
    }
  };
  return (0, _request2.default)(opts);
};
var getAreaConfig = exports.getAreaConfig = function getAreaConfig(slug) {
  var opts = {
    url: '/v1/current_app',
    params: {
      slug: slug
    }
  };
  return (0, _request2.default)(opts);
};
var getUsers = exports.getUsers = function getUsers() {
  var opts = {
    url: '/'
  };
  return (0, _request2.default)(opts);
};