import ApiConfig from '@/config/api.config';
import * as Taro from '@tarojs/taro';
import { IOpts } from '@/utils/request.interface';


const optsInterceptor = function (chain: Taro.Chain) {
  const opts: IOpts = chain.requestParams;
  opts.header = {
    'Content-Type': 'application/json;charset=utf-8',
    ...opts.header,
  };


  opts.url = ApiConfig.url + opts.url;
  opts.method = (opts.method || 'GET').toLocaleUpperCase() as IOpts['method'];

  // GET请求拼接查询参数字符串
  if (opts.method === 'GET' && opts.params) {
    if (typeof opts.params === 'object') {
      const query = Object.entries(opts.params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
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
}


// 添加拦截器
Taro.addInterceptor(Taro.interceptors.logInterceptor); // 内置log拦截器
Taro.addInterceptor(optsInterceptor); // 参数处理
