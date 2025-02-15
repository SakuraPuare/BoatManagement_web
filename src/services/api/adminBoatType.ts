
/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

/** 创建船舶类型 POST /admin/boat-type/ */
export async function create4(
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
export async function get4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get4Params,
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
export async function update4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.update4Params,
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
export async function delete4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete4Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat-type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取船舶类型列表 GET /admin/boat-type/list */
export async function list4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list4Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatTypesVO>("/admin/boat-type/list", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}

/** 获取船舶类型列表分页 GET /admin/boat-type/page */
export async function listPage4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPage4Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatTypesVO>("/admin/boat-type/page", {
    method: "GET",
    params: {
      // page has a default value: 1
      page: "1",
      // size has a default value: 10
      size: "10",
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}
