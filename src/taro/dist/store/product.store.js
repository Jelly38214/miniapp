"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tslib = require("../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require("../npm/mobx/lib/mobx.js");

var _index = require("../api/index.js");

var Api = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductStore = function ProductStore() {
  var _this = this;

  _classCallCheck(this, ProductStore);

  this.getCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Api.getCategories();

          case 3:
            _this.categories = _context.sent;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

            console.warn(_context.t0);
            return _context.abrupt("return", false);

          case 10:
            return _context.abrupt("return", true);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 6]]);
  }));
  this.getHotProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Api.getHotProduct();

          case 3:
            _this.hotProduct = _context2.sent;
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);

            console.warn(_context2.t0);
            return _context2.abrupt("return", false);

          case 10:
            return _context2.abrupt("return", true);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 6]]);
  }));
  this.getGenreBanner = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var genre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'home_top';
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Api.getGenreBanner(genre);

          case 3:
            _this.homeTopBanner = _context3.sent;
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

            console.warn(_context3.t0);
            return _context3.abrupt("return", false);

          case 10:
            return _context3.abrupt("return", true);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[0, 6]]);
  }));

  this.getPhoneModel = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(brand_name, model_name) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Api.getPhoneModel(brand_name, model_name);

            case 3:
              _this.phoneModel = _context4.sent;

              console.warn('机型蜀绣', _this.phoneModel);
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);

              console.warn(_context4.t0);
              return _context4.abrupt("return", false);

            case 11:
              return _context4.abrupt("return", true);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 7]]);
    }));

    return function (_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.categories = [];
  this.hotProduct = [];
  this.homeTopBanner = [];
  this.phoneModel = null;
};

tslib_1.__decorate([_mobx.observable], ProductStore.prototype, "categories", undefined);
tslib_1.__decorate([_mobx.observable], ProductStore.prototype, "hotProduct", undefined);
tslib_1.__decorate([_mobx.observable], ProductStore.prototype, "homeTopBanner", undefined);
tslib_1.__decorate([_mobx.observable], ProductStore.prototype, "phoneModel", undefined);
tslib_1.__decorate([_mobx.observable], ProductStore.prototype, "getCategories", undefined);
tslib_1.__decorate([_mobx.action], ProductStore.prototype, "getHotProduct", undefined);
tslib_1.__decorate([_mobx.action], ProductStore.prototype, "getGenreBanner", undefined);
tslib_1.__decorate([_mobx.action], ProductStore.prototype, "getPhoneModel", undefined);
exports.default = new ProductStore();