// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建供应商 POST /admin/vendor */
export async function createVendor(
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseVendorsVO>("/admin/vendor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商详情 GET /admin/vendor/${param0} */
export async function getVendorById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorByIdParams,
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
export async function updateVendor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVendorParams,
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
export async function deleteVendor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVendorParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/vendor/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取供应商 GET /admin/vendor/ids */
export async function getVendorByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorByIdsParams,
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

/** 获取供应商列表 GET /admin/vendor/list */
export async function getVendorList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorListParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseVendorsVO>("/admin/vendor/list", {
    method: "GET",
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

/** 分页获取供应商列表 GET /admin/vendor/page */
export async function getVendorPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorPageParams,
  body: API.BaseVendorsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseVendorsVO>("/admin/vendor/page", {
    method: "GET",
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
