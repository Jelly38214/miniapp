export const allApiConfig = {
  development: {
    UID: '', // uid & secret用于鉴权，自己根据情况使用
    SECRET: '',
    url: 'https://randomuser.me/api' // 请求api接口
  },
  production: {
    UID: '',
    SECRET: '',
    url: ''
  },
  env: process.env.NODE_ENV // 获得环境变量，具体配置在根目录下的config/dev.js或prod.js配置
};

type ApiConfigType = typeof allApiConfig['production'];
export default allApiConfig[allApiConfig.env] as ApiConfigType;

