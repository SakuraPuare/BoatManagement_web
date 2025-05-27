// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 获取船艇类型详情 GET /public/boat-type/${param0} */
export async function getPublicBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/public/boat-type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取船艇类型列表 GET /public/boat-type/ids */
export async function getPublicBoatTypeByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicBoatTypeByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/public/boat-type/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取船艇类型列表 POST /public/boat-type/list */
export async function getPublicBoatTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicBoatTypeListParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/public/boat-type/list", {
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

/** 分页获取船艇类型列表 POST /public/boat-type/page */
export async function getPublicBoatTypePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicBoatTypePageParams,
  body: API.BaseBoatTypesDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/public/boat-type/page", {
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
