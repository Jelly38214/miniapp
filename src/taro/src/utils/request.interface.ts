import { arrayBuffer } from "@tarojs/taro";

export interface IOpts {
  url: string;
  header?: Object;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  data?: Object | string | arrayBuffer;
  params?: IOpts['data'];
  dataType?: string;
  responseType?: string;
}


export interface IRequestRes<T> { // 后端返回数据的模型，根据你的需求修改
  statusCode: number;
  data: {
    results: T;
  };
  header: Object;
}
