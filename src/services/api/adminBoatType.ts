import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建船舶类型 POST /admin/boat-type/ */
export async function createAdminBoatType(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/boat-type/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶类型详情 GET /admin/boat-type/${param0} */
export async function getAdminBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/admin/boat-type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新船舶类型 PUT /admin/boat-type/${param0} */
export async function updateAdminBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminBoatTypeParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat-type/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除船舶类型 DELETE /admin/boat-type/${param0} */
export async function deleteAdminBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取船舶类型列表 POST /admin/boat-type/list */
export async function getAdminBoatTypeListQuery(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/admin/boat-type/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶类型列表分页 POST /admin/boat-type/page */
export async function getAdminBoatTypePageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminBoatTypePageQueryParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/admin/boat-type/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      // page has a default value: 1
      page: "1",
      // size has a default value: 10
      size: "10",
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
