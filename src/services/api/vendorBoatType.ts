/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

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

/** 获取供应商船舶类型列表 GET /vendor/boat-type/list */
export async function getVendorBoatTypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatTypesParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/vendor/boat-type/list", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}

/** 获取供应商船舶列表分页 GET /vendor/boat-type/page */
export async function getVendorBoatTypesPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatTypesPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/vendor/boat-type/page", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}
