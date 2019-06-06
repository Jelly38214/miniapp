/** 
 * @description 一个类nodejs的eventEmitter模块
 */

function isFunction(fn) {
  return typeof fn === 'function';
}

if (!Array.isArray) {
  Array.isArray = function (item) {
    return Object.prototype.toString.call(item) === '[object Array]';
  }
}

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
EventEmitter.defaultMaxListeners = 10; // 默认最多10个监听器

EventEmitter.prototype.addListener = function (type, listener, isPrepend) { // 第三个参数，表示是否添加在数组前面
  if (!isFunction(listener)) {
    throw TypeError('监听器必须是一个函数');
  }

  if (!this._events) {
    this._events = {};
  }

  if (!this._events[type]) { // 记录事件
    this._events[type] = listener;
  } else if (Array.isArray(this._events[type])) {
    isPrepend ? this._events[type].unshift(listener) : this._events[type].push(listener);
  } else { // 不是数组，变为数组来存储
    this._events[type] = isPrepend ? [listener, this._events[type]] : [this._events[type], listener];
  }

  if (this._events[type].warned) {
    console.warn('已经超过所能添加的监听器个数，注意内存泄漏');
  }

  // 判断监听器的数量是否超过最大值
  if (Array.isArray(this._events[type]) && !this._events[type].warned) {
    var max = this._maxListeners === undefined ? EventEmitter.defaultMaxListeners : this._maxListeners;
    if (max && max > 0 && this._events[type].length > max) {
      this._events[type].warned = true;
      console.warn(`最多只能添加${max}个监听器，可以通过setMaxListeners方法来更改这个值，但过多可能会造成内存泄漏`);
    }
  }

  return this;
}

EventEmitter.prototype.prependListener = function (type, listener) {
  return this.addListener(type, listener, true);
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener; // on只是addListener的别名

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) {
    throw TypeError('once方法的监听器参数必须为函数');
  }

  var fired = false;

  function g() {
    this.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(this, arguments); // 调用真正的监听器
    }
  }
  g.listener = listener;

  this.on(type, g);
  return this;
}

EventEmitter.prototype.removeListener = function (type, listener) {
  if (!isFunction(listener)) {
    throw TypeError('removeListener方法的监听器参数必须为函数');
  }

  if (!this._events || this._events[type]) {
    return this;
  }

  var list = this._events[type],
    position = -1;

  if (list === listener) {
    delete this._events[type];
  } else if (Array.isArray(list) && list.length > 1) {
    for (var index = 0; index < list.length; index++) {
      if (list[index] === listener) {
        position = index;
        break;
      }
    }
  } else {

  }

  if (position < 0) {
    return this;
  }

  if (list.length === 1) {
    delete this._events[type];
  } else {
    list.splice(position, 1);
  }

  return this;
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener; // removeListener的别名

EventEmitter.prototype.removeAllListeners = function (type) {
  if (!this._events || !this._events[type]) {
    return this;
  }

  delete this._events[type];
  return this;
}

/** 
 * @param {number} number
 * @description 设置最大监听数目
 */
EventEmitter.prototype.setMaxListeners = function (number) {
  if (!Number.isInteger(number) || number < 0) {
    throw TypeError('setMaxListeners的参数必须是一个正整数');
  }

  this._maxListeners = number;
  return this;
}
/** 
 * @params {string} event
 * @returns {array} 指定事件的监听数组
 */
EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) {
    return [];
  } else if (Array.isArray(this._events[type])) {
    ret = this._events[type].slice(); // 注意不要把this._event[type]返回去
  } else {
    ret = [this._events[type]];
  }

  return ret;
}

/** 
 * @returns {boolean}
 */
EventEmitter.prototype.emit = function (type) {
  if (!this._events) {
    this._events = {};
    return false;
  }

  var handler = this._events[type];

  if (!handler) {
    return false;
  }

  if (isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[2]);
        break;
      default:
        handler.call(this, Array.prototype.slice.call(arguments, 1));
        break;
    }
  } else if (Array.isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);
    var listeners = handler.slice();
    var length = listeners.length;
    for (var i = 0; i < length; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
}


export default EventEmitter;