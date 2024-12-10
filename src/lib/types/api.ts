// API响应的基础接口
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  time: number;
}

// API响应状态码
export enum ResponseCode {
  CODE_SUCCESS = 200,
  CODE_BAD_REQUEST = 400,
  CODE_UNAUTHORIZED = 401,
  CODE_FORBIDDEN = 403,
  CODE_NOT_FOUND = 404,
  CODE_TOO_MANY_REQUESTS = 429,
  CODE_INTERNAL_SERVER_ERROR = 500,
  CODE_SERVICE_UNAVAILABLE = 503,
  CODE_GATEWAY_TIMEOUT = 504,
}
