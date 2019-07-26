'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoneModel = exports.getGenreBanner = exports.getCategories = exports.getHotProduct = undefined;

var _request = require('../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHotProduct = exports.getHotProduct = function getHotProduct() {
  var opts = {
    url: '/v1/current_app/products/flatten'
  };
  return (0, _request2.default)(opts);
};
var getCategories = exports.getCategories = function getCategories() {
  var opts = {
    url: '/v1/current_app/categories'
  };
  return (0, _request2.default)(opts);
};
var getGenreBanner = exports.getGenreBanner = function getGenreBanner() {
  var genre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'home_top';

  var opts = {
    url: '/v1/current_app/banners/' + genre + '/genre_detail'
  };
  return (0, _request2.default)(opts);
};
// 获得本机询价
var getPhoneModel = exports.getPhoneModel = function getPhoneModel(brand_name, model_name) {
  var opts = {
    // url: '/v1/model_mapping',
    url: '/v1/amms',
    params: {
      brand_name: brand_name,
      model_name: model_name
    }
  };
  return (0, _request2.default)(opts);
};