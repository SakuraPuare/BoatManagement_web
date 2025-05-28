// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 获取用户信息 GET /user/info/${param0} */
export async function userGetUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUserInfoVO>(`/user/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /user/info/me */
export async function userGetCurrentUser(options?: { [key: string]: any }) {
  return request<API.ResponseUserWithRoleVO>("/user/info/me", {
    method: "GET",
    ...(options || {}),
  });
}

/** 检查当前用户是否是指定商家 GET /user/info/merchant/${param0} */
export async function userCheckIsMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userCheckIsMerchantParams,
  options?: { [key: string]: any }
) {
  const { merchantId: param0, ...queryParams } = params;
  return request<API.ResponseBoolean>(`/user/info/merchant/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}
