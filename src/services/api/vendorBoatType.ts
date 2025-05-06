// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建供应商船舶类型 POST /vendor/boat-type/ */
export async function createBoatType(
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatTypesVO>("/vendor/boat-type/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商船舶类型详情 GET /vendor/boat-type/${param0} */
export async function getBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/vendor/boat-type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新供应商船舶类型 PUT /vendor/boat-type/${param0} */
export async function updateBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateBoatTypeParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/vendor/boat-type/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除供应商船舶类型 DELETE /vendor/boat-type/${param0} */
export async function deleteBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取供应商船舶类型列表 GET /vendor/boat-type/ids */
export async function getBoatTypeByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypeByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/vendor/boat-type/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取供应商船舶类型列表 POST /vendor/boat-type/list */
export async function getBoatTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypeListParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/vendor/boat-type/list", {
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

/** 分页获取供应商船舶类型列表 POST /vendor/boat-type/page */
export async function getBoatTypePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatTypePageParams,
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
