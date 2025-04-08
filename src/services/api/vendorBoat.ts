import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建供应商船舶 POST /vendor/boat/ */
export async function vendorCreateBoat(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatsVO>("/vendor/boat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商船舶详情 GET /vendor/boat/${param0} */
export async function vendorGetBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorGetBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatsVO>(`/vendor/boat/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新供应商船舶 PUT /vendor/boat/${param0} */
export async function vendorUpdateBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorUpdateBoatParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatsVO>(`/vendor/boat/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除供应商船舶 DELETE /vendor/boat/${param0} */
export async function vendorDeleteBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorDeleteBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取供应商船舶列表 GET /vendor/boat/ids */
export async function vendorGetBoatByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorGetBoatByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/vendor/boat/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取供应商船舶列表 POST /vendor/boat/list */
export async function vendorGetBoatList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorGetBoatListParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/vendor/boat/list", {
    method: "POST",
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

/** 分页获取供应商船舶列表 POST /vendor/boat/page */
export async function vendorGetBoatPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorGetBoatPageParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatsVO>("/vendor/boat/page", {
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
