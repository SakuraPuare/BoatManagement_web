import type { API } from "@/services/api/typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建供应商 POST /admin/vendor/ */
export async function create(
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/vendor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商详情 GET /admin/vendor/${param0} */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseVendorsVO>(`/admin/vendor/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新供应商 PUT /admin/vendor/${param0} */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/vendor/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除供应商 DELETE /admin/vendor/${param0} */
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/vendor/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取供应商列表 POST /admin/vendor/list */
export async function list(
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseVendorsVO>("/admin/vendor/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商列表分页 POST /admin/vendor/page */
export async function listPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPageParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseVendorsVO>("/admin/vendor/page", {
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
