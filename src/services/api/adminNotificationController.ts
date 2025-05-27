// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 此处后端没有提供注释 POST /admin/notifications */
export async function createNotification(
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseNotificationsVO>("/admin/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin/notifications/${param0} */
export async function updateNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateNotificationParams,
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseNotificationsVO>(
    `/admin/notifications/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 DELETE /admin/notifications/${param0} */
export async function deleteNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteNotificationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/notifications/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/notifications/ids */
export async function getNotificationsByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationsByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseNotificationsVO>(
    "/admin/notifications/ids",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /admin/notifications/list */
export async function getNotificationsList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationsList1Params,
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseNotificationsVO>(
    "/admin/notifications/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /admin/notifications/page */
export async function getNotificationsPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationsPage1Params,
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseNotificationsVO>(
    "/admin/notifications/page",
    {
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
    }
  );
}

/** 此处后端没有提供注释 POST /admin/notifications/send */
export async function sendNotification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendNotificationParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseNotificationsVO>("/admin/notifications/send", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
