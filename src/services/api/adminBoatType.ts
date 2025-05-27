// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建船艇类型 POST /admin/boat-type/ */
export async function adminCreateBoatType(
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

/** 获取船艇类型详情 GET /admin/boat-type/${param0} */
export async function adminGetBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatTypesVO>(`/admin/boat-type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新船艇类型 PUT /admin/boat-type/${param0} */
export async function adminUpdateBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateBoatTypeParams,
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

/** 删除船艇类型 DELETE /admin/boat-type/${param0} */
export async function adminDeleteBoatType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteBoatTypeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取船艇类型列表 GET /admin/boat-type/ids */
export async function adminGetBoatTypeByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatTypeByIdsParams,
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

/** 获取船艇类型列表 POST /admin/boat-type/list */
export async function adminGetBoatTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatTypeListParams,
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

/** 分页获取船艇类型列表 POST /admin/boat-type/page */
export async function adminGetBoatTypePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatTypePageParams,
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
