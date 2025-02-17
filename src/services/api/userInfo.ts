import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /user/info/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUserInfoVO>(`/user/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/info/me */
export async function getMe(options?: { [key: string]: any }) {
  return request<API.ResponseBaseAccountsVO>("/user/info/me", {
    method: "GET",
    ...(options || {}),
  });
}
