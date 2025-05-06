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

// 创建自定义请求函数
const request = async <T = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axiosInstance(url, options);

    // 可以在这里统一处理一些全局错误，但不自动抛出异常
    if (response.data.code !== 200) {
      if (response.data.code === 401) {
        useUserStore.getState().logout();
      }

      console.error(`请求错误：${response.data.message}`);
      // 可以选择在这里显示错误提示
      toast.error(response.data.message || "请求失败");
    }

    return response.data; // 返回完整的 ApiResponse
  } catch (error) {
    console.error(`请求失败:`, error);
    // 网络错误或其他非业务逻辑错误
    toast.error(error instanceof Error ? error.message : "网络请求失败");
    throw error;
  }
};

export default request;
