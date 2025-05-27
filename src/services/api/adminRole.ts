// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建角色 POST /admin/role/ */
export async function adminCreateRole(
  body: API.BaseRoleDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseRoleVO>("/admin/role/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色详情 GET /admin/role/${param0} */
export async function adminGetRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseRoleVO>(`/admin/role/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新角色 PUT /admin/role/${param0} */
export async function adminUpdateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateRoleParams,
  body: API.BaseRoleDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseRoleVO>(`/admin/role/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /admin/role/${param0} */
export async function adminDeleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/role/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 为用户分配角色 POST /admin/role/assign */
export async function adminAssignRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminAssignRoleParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/role/assign", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据 ID 获取角色列表 GET /admin/role/ids */
export async function adminGetRoleByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetRoleByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseRoleVO>("/admin/role/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色列表 POST /admin/role/list */
export async function adminGetRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetRoleListParams,
  body: API.BaseRoleDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseRoleVO>("/admin/role/list", {
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

/** 分页获取角色列表 POST /admin/role/page */
export async function adminGetRolePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetRolePageParams,
  body: API.BaseRoleDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseRoleVO>("/admin/role/page", {
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

/** 移除用户角色 POST /admin/role/revoke */
export async function adminRevokeRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminRevokeRoleParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/role/revoke", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
