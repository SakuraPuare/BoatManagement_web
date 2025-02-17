import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建用户 POST /admin/user/ */
export async function createAdminAccount(
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 GET /admin/user/${param0} */
export async function getAdminUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseAccountsVO>(`/admin/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 PUT /admin/user/${param0} */
export async function updateAdminAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminAccountParams,
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/user/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin/user/${param0} */
export async function deleteAdminAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminAccountParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/user/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 POST /admin/user/list */
export async function getAdminUserListQuery(
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseAccountsVO>("/admin/user/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表分页 POST /admin/user/page */
export async function getAdminUserPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUserPageQueryParams,
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseAccountsVO>("/admin/user/page", {
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
