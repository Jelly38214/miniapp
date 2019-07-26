import Request from '@/utils/request';
import { IOpts } from '@/utils/request.interface';
import Base64 from '@/utils/base64';

export const getAccessToken = <T>(UID: string, SECRET: string) => {
  const opts: IOpts = {
    url: '/oauth/token',
    method: 'POST',
    params: {
      'grant_type': 'client_credentials'
    },
    header: {
      'Authorization': 'Basic' + ' ' + Base64.encode(`${UID}:${SECRET}`)
    }
  };

  return Request<T>(opts);
};

export const getAreaConfig = <T>(slug) => {
  const opts: IOpts = {
    url: '/v1/current_app',
    params: {
      slug
    }
  };

  return Request<T>(opts);
}

export const getUsers = <T>() => {
  const opts: IOpts = {
    url: '/'
  };

  return Request<T>(opts);
}
