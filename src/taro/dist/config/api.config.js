'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var allApiConfig = exports.allApiConfig = {
  development: {
    UID: '',
    SECRET: '',
    url: 'https://randomuser.me/api' // 请求api接口
  },
  production: {
    UID: '',
    SECRET: '',
    url: ''
  },
  env: "development" // 获得环境变量，具体配置在根目录下的config/dev.js或prod.js配置
};
exports.default = allApiConfig[allApiConfig.env];