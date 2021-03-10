import axios from 'axios';
import { BASE_URL, ACCESS_TOKEN } from '../constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN);
    if (token) config.headers = { ...config.headers, Authorization: token };

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.data.access_token;
    if (token) window.localStorage.setItem(ACCESS_TOKEN, 'Bearer ' + token);

    return response;
  },
  (err) => {
    // !!!
    console.log(err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
