import type { API } from "@/services/api/typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建用户船只请求 创建用户船只请求 POST /user/boat/request/ */
export async function createUserBoatRequest(
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/user/boat/request/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消用户船只请求 取消用户船只请求 POST /user/boat/request/cancel/${param0} */
export async function cancelUserBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelUserBoatRequestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/boat/request/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户船只请求列表 获取用户船只请求列表 POST /user/boat/request/list */
export async function getUserBoatRequestsListQuery(
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/user/boat/request/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取用户船只请求列表分页 获取用户船只请求列表分页 POST /user/boat/request/page */
export async function getUserBoatRequestsPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBoatRequestsPageQueryParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatRequestsVO>(
    "/user/boat/request/page",
    {
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
    }
  );
}

/** 更新用户船只请求 更新用户船只请求 POST /user/boat/request/update/${param0} */
export async function updateUserBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserBoatRequestParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/boat/request/update/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
