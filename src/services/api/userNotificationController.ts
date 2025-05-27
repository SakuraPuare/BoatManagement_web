// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 此处后端没有提供注释 PUT /user/notifications/${param0}/read */
export async function markAsRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.markAsReadParams,
  options?: { [key: string]: any }
) {
  const { notificationId: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/user/notifications/${param0}/read`, {
    method: "PUT",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /user/notifications/batch-read */
export async function markMultipleAsRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.markMultipleAsReadParams,
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.ResponseVoid>("/user/notifications/batch-read", {
    method: "PUT",
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

/** 此处后端没有提供注释 POST /user/notifications/list */
export async function getNotificationsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationsListParams,
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseNotificationsVO>(
    "/user/notifications/list",
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

/** 此处后端没有提供注释 POST /user/notifications/page */
export async function getNotificationsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNotificationsPageParams,
  body: API.BaseNotificationsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseNotificationsVO>(
    "/user/notifications/page",
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

/** 此处后端没有提供注释 GET /user/notifications/unread-count */
export async function getUnreadCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnreadCountParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseLong>("/user/notifications/unread-count", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
