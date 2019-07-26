"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../npm/@tarojs/taro-tt/index.js");

var _index2 = _interopRequireDefault(_index);

require("./interceptor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = function Request(opts) {
  return new Promise(function (resolve, reject) {
    console.warn('opts', opts);
    _index2.default.request(opts).then(function (res) {
      if (res.statusCode !== 200) {
        reject(res);
        return;
      }
      resolve(res.data.results);
    }).catch(function (error) {
      _index2.default.showToast({
        title: '网络繁忙，请稍后再试！',
        mask: true,
        icon: 'loading'
      });
      reject(error);
    });
  });
};
exports.default = Request;