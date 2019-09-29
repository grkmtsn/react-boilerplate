import axios from 'axios';
import qs from 'qs';
import { authenticationService } from '@/services';
import { config } from './config';

const client = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8',
  },
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

const request = options => {
  const onSuccess = response => {
    console.log('Request Success');
    return response.data;
  };
  const onError = error => {
    console.error('Request Error');
    let errorMessage = 'Something went wrong!';
    const redirectLogin = () => {
      authenticationService.logout();
      window.location.reload(true);
    };
    if (error.response) {
      const { data } = error.response;
      console.log(error.response);
      switch (data.status) {
        case 400:
          errorMessage = 'Invalid Request';
          break;
        case 401:
          errorMessage = 'Not Authorized';
          redirectLogin();
          break;
        case 403:
          errorMessage = 'Forbidden';
          redirectLogin();
          break;
        case 404:
          errorMessage = 'Not Found';
          break;
        default:
          errorMessage = data.message || 'Something went wrong!';
          break;
      }
    }
    return Promise.reject(errorMessage);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export { request };
