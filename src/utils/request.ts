import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8123',
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default request; 