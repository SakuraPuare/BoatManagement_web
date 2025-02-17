import type { API } from "@/services/api/typings";
/* eslint-disable */
import request from "@/utils/request";

/** 审核操作 PUT /admin/audit/unit/${param0} */
export async function audit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/audit/unit/${param0}`, {
    method: "PUT",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取所有单位认证列表 POST /admin/audit/unit/list */
export async function list5(
  body: API.CertifyQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUnitsVO>("/admin/audit/unit/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取所有单位认证列表分页 POST /admin/audit/unit/page */
export async function listPage5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPage5Params,
  body: API.CertifyQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseUnitsVO>("/admin/audit/unit/page", {
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

/** 审核操作 PUT /admin/audit/user/${param0} */
export async function auditUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/audit/user/${param0}`, {
    method: "PUT",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取所有用户认证列表 POST /admin/audit/user/list */
export async function listUser(
  body: API.CertifyQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUserCertifyVO>("/admin/audit/user/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取所有用户认证列表分页 POST /admin/audit/user/page */
export async function listUserPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserPageParams,
  body: API.CertifyQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseUserCertifyVO>("/admin/audit/user/page", {
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
