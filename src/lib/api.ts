import type { paths } from "@/types/api";
import createClient from "openapi-fetch";
import { useUserStore } from "@/stores/user";

// 定义请求配置接口
interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
}

// 定义响应接口
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  time: number;
}

// 创建API实例
const createApiClient = () => {
  const client = createClient<paths>({
    baseUrl: process.env.BACKEND_URL || "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  const requestInterceptor = async (config: RequestConfig) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  };

  // 响应拦截器
  const responseInterceptor = async (response: {
    data: ApiResponse<unknown> | unknown;
    response: Response;
  }) => {
    console.log(response);
    if (!response.response.ok) {
      throw new Error(response.response.statusText);
    } else {
      // 如果返回只有一个true
      if (response.data === true) {
        return {
          code: 200,
          data: true,
          message: "success",
          time: Date.now(),
        } as ApiResponse<unknown>;
      }
      // 检查是否包含time属性来判断是否为ApiResponse类型
      else if ("time" in response.data) {
        // 作为ApiResponse处理
        const result = response.data as ApiResponse<unknown>;
        if (result.code === 200) {
          return result;
        }
        throw new Error(result.message || "Request failed");
      } else if ("timestamp" in response.data) {
        // 作为普通响应处理
        return {
          code: response.status,
          data: null,
          message: response.error,
          time: Date.now(),
        } as ApiResponse<unknown>;
      }
      // 作为普通响应处理
      return {
        code: 200,
        data: response.data,
        message: "success",
        time: Date.now(),
      } as ApiResponse<unknown>;
    }
  };

  // 封装请求方法
  const request = async <T>(
    method: keyof typeof client,
    path: string,
    options?: RequestConfig,
  ): Promise<T> => {
    try {
      const config = await requestInterceptor(options || {});
      const response = await (
        client[method] as (
          path: string,
          config: RequestConfig,
        ) => Promise<{
          data: ApiResponse<unknown>;
          response: Response;
        }>
      )(path, config);
      const result = await responseInterceptor(response);
      return result.data as T;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: <T>(path: string, options?: RequestConfig) =>
      request<T>("GET", path, options),
    post: <T>(path: string, options?: RequestConfig) =>
      request<T>("POST", path, options),
    put: <T>(path: string, options?: RequestConfig) =>
      request<T>("PUT", path, options),
    patch: <T>(path: string, options?: RequestConfig) =>
      request<T>("PATCH", path, options),
    delete: <T>(path: string, options?: RequestConfig) =>
      request<T>("DELETE", path, options),
  };
};

// 导出API实例
export const api = createApiClient();

// 使用示例:
// try {
//	const data = await api.get<UserData>('/users/1');
//	console.log(data); // 直接是UserData类型
// } catch (error) {
//	console.error(error.message);
// }
