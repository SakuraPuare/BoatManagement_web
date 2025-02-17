import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建船舶 POST /admin/boat/ */
export async function createAdminBoat(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/boat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶详情 GET /admin/boat/${param0} */
export async function getAdminBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatsVO>(`/admin/boat/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新船舶 PUT /admin/boat/${param0} */
export async function updateAdminBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminBoatParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除船舶 DELETE /admin/boat/${param0} */
export async function deleteAdminBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取船舶列表 POST /admin/boat/list */
export async function getAdminBoatListQuery(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBoatVO>("/admin/boat/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶列表分页 POST /admin/boat/page */
export async function getAdminBoatPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminBoatPageQueryParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBoatVO>("/admin/boat/page", {
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
