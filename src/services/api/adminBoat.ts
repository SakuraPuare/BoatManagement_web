
/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

/** 创建船舶 POST /admin/boat/ */
export async function create3(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/boat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶详情 GET /admin/boat/${param0} */
export async function get3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get3Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatsVO>(`/admin/boat/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新船舶 PUT /admin/boat/${param0} */
export async function update3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.update3Params,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除船舶 DELETE /admin/boat/${param0} */
export async function delete3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete3Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取船舶列表 GET /admin/boat/list */
export async function list3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list3Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/admin/boat/list", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}

/** 获取船舶列表分页 GET /admin/boat/page */
export async function listPage3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPage3Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatsVO>("/admin/boat/page", {
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
