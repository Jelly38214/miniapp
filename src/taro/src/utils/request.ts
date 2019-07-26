import { IRequestRes } from './request.interface';
import Taro from '@tarojs/taro';
// import ApiConfig from '@/config/api.config';
import { IOpts } from '@/utils/request.interface';
import './interceptor';

const Request = <T>(opts: IOpts): Promise<T> => {
  return new Promise((resolve, reject) => {
    console.warn('opts', opts);
    Taro.request(opts)
      .then((res: IRequestRes<T>) => {
        if (res.statusCode !== 200) {
          reject(res);
          return;
        }

        resolve(res.data.results);
      })
      .catch((error) => {
        Taro.showToast({
          title: '网络繁忙，请稍后再试！',
          mask: true,
          icon: 'loading'
        });
        reject(error);
      });
  });
}

export default Request;
