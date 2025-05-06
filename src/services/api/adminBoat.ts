// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建船舶 POST /admin/boat/ */
export async function adminCreateBoat(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatsVO>("/admin/boat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船舶详情 GET /admin/boat/${param0} */
export async function adminGetBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatParams,
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
export async function adminUpdateBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateBoatParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatsVO>(`/admin/boat/${param0}`, {
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
export async function adminDeleteBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取船舶列表 GET /admin/boat/ids */
export async function adminGetBoatByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/admin/boat/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取船舶列表 POST /admin/boat/list */
export async function adminGetBoatList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatListParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/admin/boat/list", {
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

/** 分页获取船舶列表 POST /admin/boat/page */
export async function adminGetBoatPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatPageParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatsVO>("/admin/boat/page", {
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
