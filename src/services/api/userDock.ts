import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取用户码头详情 GET /user/dock/${param0} */
export async function userGetDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetDockParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/user/dock/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取用户码头列表 GET /user/dock/ids/${param0} */
export async function userGetDockByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetDockByIdsParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ResponseListBaseDocksVO>(`/user/dock/ids/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户码头列表 GET /user/dock/list */
export async function userGetDockList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetDockListParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/user/dock/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取用户码头列表 GET /user/dock/page */
export async function userGetDockPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetDockPageParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/user/dock/page", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      // pageNum has a default value: 1
      pageNum: "1",
      // pageSize has a default value: 10
      pageSize: "10",

      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
