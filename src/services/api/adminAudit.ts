import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 审核操作 PUT /admin/audit/unit/${param0} */
export async function auditAdminUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditAdminUnitParams,
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

/** 审核操作 PUT /admin/audit/user/${param0} */
export async function auditAdminUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditAdminUserParams,
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
