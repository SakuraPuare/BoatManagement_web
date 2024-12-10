import { Configuration, AuthApi } from '@/api';
import { useUserStore } from '@/stores/user';
import { API_URL } from '@/config';
// import { ApiResponse, ResponseCode } from '@/lib/types/api';

// API基础配置
const createConfig = () => {
  const config = new Configuration({
    basePath: API_URL,
    baseOptions: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  // 添加响应拦截器
  // config.baseOptions.responseInterceptor = async (response: ApiResponse) => {
  //   // 如果响应正常，直接返回
  //   const data = response.data as ApiResponse;
  //   if (data.code === ResponseCode.CODE_SUCCESS) {
  //     return data.data; // 直接返回数据部分
  //   } else if (data.code === ResponseCode.CODE_UNAUTHORIZED) {
  //     // 如果响应状态码为401，则清除token
  //     useUserStore.getState().clearToken();
  //     throw new Error(data.message);
  //   } else {
  //     throw new Error(data.message);
  //   }
  // };

  // 添加认证token
  const token = useUserStore.getState().token;
  if (token) {
    config.apiKey = () => {
      return "Bearer " + token;
    };
  }

  return config;
};

// API客户端实例
class ApiClient {
  private static instance: ApiClient;
  private config: Configuration;
  
  public auth: AuthApi;

  private constructor() {
    this.config = createConfig();
    this.auth = new AuthApi(this.config);
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}

// 初始化API客户端
export const initializeApi = () => {
  return ApiClient.getInstance();
}

// 导出API实例供使用
export const api = ApiClient.getInstance();
