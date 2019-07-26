"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _apiConfig = require("../config/api.config.js");

var _apiConfig2 = _interopRequireDefault(_apiConfig);

var _index = require("../npm/@tarojs/taro-tt/index.js");

var Taro = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optsInterceptor = function optsInterceptor(chain) {
  var opts = chain.requestParams;
  opts.header = _extends({
    'Content-Type': 'application/json;charset=utf-8'
  }, opts.header);
  opts.url = _apiConfig2.default.url + opts.url;
  opts.method = (opts.method || 'GET').toLocaleUpperCase();
  // GET请求拼接查询参数字符串
  if (opts.method === 'GET' && opts.params) {
    if (_typeof(opts.params) === 'object') {
      var query = Object.entries(opts.params).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return key + "=" + value;
      }).join('&');
      opts.url = opts.url + '?' + query;
    }
    if (typeof opts.params === 'string') {
      opts.url = opts.url + opts.params;
    }
  }
  if (opts.method !== 'GET') {
    opts.data = opts.params;
    delete opts.params;
  }
  return chain.proceed(opts);
};
// 添加拦截器
Taro.addInterceptor(Taro.interceptors.logInterceptor); // 内置log拦截器
Taro.addInterceptor(optsInterceptor); // 参数处理