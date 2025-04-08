import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建用户船只请求 POST /user/boat/request */
export async function userCreateBoatRequest(
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatRequestsVO>("/user/boat/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户船只请求详情 GET /user/boat/request/${param0} */
export async function userGetBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatRequestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/user/boat/request/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 更新用户船只请求 PUT /user/boat/request/${param0} */
export async function userUpdateBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userUpdateBoatRequestParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/user/boat/request/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 取消用户船只请求 PUT /user/boat/request/cancel/${param0} */
export async function userCancelBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userCancelBoatRequestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/user/boat/request/cancel/${param0}`,
    {
      method: "PUT",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据ID获取用户船只请求 GET /user/boat/request/ids/${param0} */
export async function userGetBoatRequestByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatRequestByIdsParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.ResponseListBaseBoatRequestsVO>(
    `/user/boat/request/ids/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取用户船只请求列表 GET /user/boat/request/list */
export async function userGetBoatRequestList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatRequestListParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/user/boat/request/list",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取用户船只请求列表分页 GET /user/boat/request/page */
export async function userGetBoatRequestPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatRequestPageParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatRequestsVO>(
    "/user/boat/request/page",
    {
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
    }
  );
}
