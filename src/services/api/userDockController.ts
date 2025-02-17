import type { API } from "@/services/api/typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取用户码头列表 获取用户码头列表 POST /user/dock/list */
export async function getUserDockListQuery(
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/user/dock/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户码头分页列表 获取用户码头分页列表 POST /user/dock/page */
export async function getUserDockPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDockPageQueryParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/user/dock/page", {
    method: "POST",
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
