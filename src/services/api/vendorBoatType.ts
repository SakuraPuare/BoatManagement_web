import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 添加供应商船舶 POST /vendor/boat-type/ */
export async function addVendorBoatType(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/vendor/boat-type/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商船舶类型 GET /vendor/boat-type/${param0} */
export async function getVendorBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/vendor/boat-type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新供应商船舶 PUT /vendor/boat-type/${param0} */
export async function updateVendorBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVendorBoatTypeParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat-type/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除供应商船舶 DELETE /vendor/boat-type/${param0} */
export async function deleteVendorBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVendorBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取供应商船舶类型列表 POST /vendor/boat-type/list */
export async function getVendorBoatTypesListQuery(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/vendor/boat-type/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商船舶列表分页 POST /vendor/boat-type/page */
export async function getVendorBoatTypesPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatTypesPageQueryParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/vendor/boat-type/page", {
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
