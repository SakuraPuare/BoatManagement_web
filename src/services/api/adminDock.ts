import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 添加码头 POST /admin/dock/ */
export async function addAdminDocks(
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/dock/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取码头详情 GET /admin/dock/${param0} */
export async function getAdminDocks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminDocksParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/admin/dock/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新码头 PUT /admin/dock/${param0} */
export async function updateAdminDocks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminDocksParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/dock/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除码头 DELETE /admin/dock/${param0} */
export async function deleteAdminDocks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminDocksParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/dock/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取码头列表 POST /admin/dock/list */
export async function getAdminDocksListQuery(
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/admin/dock/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取码头列表分页 POST /admin/dock/page */
export async function getAdminDocksPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminDocksPageQueryParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/admin/dock/page", {
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
