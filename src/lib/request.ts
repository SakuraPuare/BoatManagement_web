import { useUserStore } from "@/stores/user";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { toast } from "sonner";

// 定义自定义的请求响应结构
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  time: number;
}

// 创建原始的 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8123",
  timeout: 30000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 直接返回响应，让业务代码处理
    return response;
  },
  (error) => {
    // 处理网络错误
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response;

      if (status === 401) {
        // 401 未授权，清除用户信息并跳转到登录页
        useUserStore.getState().logout();
        toast.error("登录已过期，请重新登录");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else if (status >= 500) {
        toast.error("服务器错误，请稍后重试");
      } else if (data?.message) {
        toast.error(data.message);
      }
    } else if (error.request) {
      // 网络错误
      toast.error("网络连接失败，请检查网络");
    } else {
      // 其他错误
      toast.error("请求失败");
    }

    return Promise.reject(error);
  }
);

// 创建自定义请求函数
const request = async <T = unknown>(
  url: string,
  options?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance(url, options);
    return response.data; // 返回完整的 ApiResponse
  } catch (error) {
    console.error(`请求失败:`, error);
    // 重新抛出错误，让调用方处理
    throw error;
  }
};

export default request;
