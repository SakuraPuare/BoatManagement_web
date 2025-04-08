import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建船舶类型 POST /admin/boat-type/ */
export async function createBoatType1(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatTypesVO>("/admin/boat-type/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶类型详情 GET /admin/boat-type/${param0} */
export async function getBoatType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatType1Params,
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
export async function updateBoatType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateBoatType1Params,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/admin/boat-type/${param0}`, {
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
export async function deleteBoatType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBoatType1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取船舶类型列表 GET /admin/boat-type/ids */
export async function getBoatTypeByIds1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypeByIds1Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/admin/boat-type/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取船舶类型列表 POST /admin/boat-type/list */
export async function getBoatTypeList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypeList1Params,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/admin/boat-type/list", {
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

/** 分页获取船舶类型列表 POST /admin/boat-type/page */
export async function getBoatTypePage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypePage1Params,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/admin/boat-type/page", {
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
