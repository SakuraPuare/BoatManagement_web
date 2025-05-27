// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建权限 POST /admin/permission/ */
export async function adminCreatePermission(
  body: API.BasePermissionDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBasePermissionVO>("/admin/permission/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取权限详情 GET /admin/permission/${param0} */
export async function adminGetPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetPermissionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBasePermissionVO>(`/admin/permission/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新权限 PUT /admin/permission/${param0} */
export async function adminUpdatePermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdatePermissionParams,
  body: API.BasePermissionDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBasePermissionVO>(`/admin/permission/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除权限 DELETE /admin/permission/${param0} */
export async function adminDeletePermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeletePermissionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/permission/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取权限列表 GET /admin/permission/ids */
export async function adminGetPermissionByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetPermissionByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBasePermissionVO>("/admin/permission/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取权限列表 POST /admin/permission/list */
export async function adminGetPermissionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetPermissionListParams,
  body: API.BasePermissionDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBasePermissionVO>("/admin/permission/list", {
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

/** 分页获取权限列表 POST /admin/permission/page */
export async function adminGetPermissionPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetPermissionPageParams,
  body: API.BasePermissionDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBasePermissionVO>("/admin/permission/page", {
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
