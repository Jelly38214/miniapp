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

var UserStore = function UserStore() {
  var _this = this;

  _classCallCheck(this, UserStore);

  this.getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Api.getUsers();

          case 3:
            _this.userArray = _context.sent;
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

  this.userArray = [];
};

tslib_1.__decorate([_mobx.observable], UserStore.prototype, "userArray", undefined);
tslib_1.__decorate([_mobx.action], UserStore.prototype, "getUsers", undefined);
exports.default = new UserStore();