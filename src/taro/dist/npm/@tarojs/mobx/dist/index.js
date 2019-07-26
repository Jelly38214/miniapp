'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var taro = require("../../taro-tt/npm/@tarojs/taro/index.js");
var mobxCommon = require("../../mobx-common/index.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function createStoreInjector(grabStoresFn, injectNames, Component) {
  var Injector =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Injector, _Component);

    function Injector(props, isPage) {
      _classCallCheck(this, Injector);

      return _possibleConstructorReturn(this, _getPrototypeOf(Injector).call(this, Object.assign.apply(Object, Array.prototype.slice.call(arguments).concat([mobxCommon.mapStoreToProps(grabStoresFn, props)])), isPage));
    }

    _createClass(Injector, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        Object.assign(this.props, mobxCommon.mapStoreToProps(grabStoresFn, this.props));

        if (typeof _get(_getPrototypeOf(Injector.prototype), "componentWillMount", this) === 'function') {
          _get(_getPrototypeOf(Injector.prototype), "componentWillMount", this).call(this);
        }
      }
    }]);

    return Injector;
  }(Component);

  _defineProperty(Injector, "isMobxInjector", true);

  _defineProperty(Injector, "displayName", mobxCommon.getInjectName(Component, injectNames));

  var target = Injector.prototype;
  var originCreateData = target._createData;

  target._createData = function () {
    Object.assign(this.props, mobxCommon.mapStoreToProps(grabStoresFn, this.props));
    return originCreateData.call(this, null, null, arguments.length <= 2 ? undefined : arguments[2]);
  };

  return Injector;
}

function inject() {
  return mobxCommon.inject.apply(undefined, Array.prototype.slice.call(arguments).concat([createStoreInjector]));
}

var Provider = function Provider() {
  _classCallCheck(this, Provider);
};

function useLocalStore(initializer, current) {
  return mobxCommon.useLocalStore(initializer, current, taro.useState);
}

function useAsObservableSource(current) {
  return mobxCommon.useAsObservableSource(current, taro.useState);
}

var index = {
  PropTypes: mobxCommon.PropTypes,
  onError: mobxCommon.onError,
  getStore: mobxCommon.getStore,
  setStore: mobxCommon.setStore,
  inject: inject,
  observer: mobxCommon.observer,
  Provider: Provider,
  useLocalStore: useLocalStore,
  useAsObservableSource: useAsObservableSource,
  isUsingStaticRendering: mobxCommon.isUsingStaticRendering,
  useStaticRendering: mobxCommon.useStaticRendering
};

exports.PropTypes = mobxCommon.PropTypes;
exports.onError = mobxCommon.onError;
exports.getStore = mobxCommon.getStore;
exports.setStore = mobxCommon.setStore;
exports.observer = mobxCommon.observer;
exports.isUsingStaticRendering = mobxCommon.isUsingStaticRendering;
exports.useStaticRendering = mobxCommon.useStaticRendering;
exports.default = index;
exports.inject = inject;
exports.Provider = Provider;
exports.useLocalStore = useLocalStore;
exports.useAsObservableSource = useAsObservableSource;