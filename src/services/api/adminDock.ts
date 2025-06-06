// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建码头 POST /admin/dock/ */
export async function adminCreateDock(
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseDocksVO>("/admin/dock/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取码头详情 GET /admin/dock/${param0} */
export async function adminGetDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetDockParams,
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
export async function adminUpdateDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateDockParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/admin/dock/${param0}`, {
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
export async function adminDeleteDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteDockParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/dock/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取码头列表 GET /admin/dock/ids */
export async function adminGetDockByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetDockByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/admin/dock/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取码头列表 POST /admin/dock/list */
export async function adminGetDockList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetDockListParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/admin/dock/list", {
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

/** 分页获取码头列表 POST /admin/dock/page */
export async function adminGetDockPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetDockPageParams,
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
