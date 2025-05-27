// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建供应商 POST /admin/vendor/ */
export async function adminCreateVendor(
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseVendorsVO>("/admin/vendor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商详情 GET /admin/vendor/${param0} */
export async function adminGetVendor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetVendorParams,
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
export async function adminUpdateVendor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateVendorParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseVendorsVO>(`/admin/vendor/${param0}`, {
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
export async function adminDeleteVendor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteVendorParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/vendor/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取供应商列表 GET /admin/vendor/ids */
export async function adminGetVendorByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetVendorByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseVendorsVO>("/admin/vendor/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取供应商列表 POST /admin/vendor/list */
export async function adminGetVendorList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetVendorListParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseVendorsVO>("/admin/vendor/list", {
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

/** 分页获取供应商列表 POST /admin/vendor/page */
export async function adminGetVendorPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetVendorPageParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseVendorsVO>("/admin/vendor/page", {
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
