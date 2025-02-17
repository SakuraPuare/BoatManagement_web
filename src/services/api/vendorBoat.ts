import type { API } from "@/services/api/typings";
/* eslint-disable */
import request from "@/utils/request";

/** 添加供应商船舶 POST /vendor/boat/ */
export async function addVendorBoat(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/vendor/boat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新供应商船舶 PUT /vendor/boat/${param0} */
export async function updateVendorBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVendorBoatParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除供应商船舶 DELETE /vendor/boat/${param0} */
export async function deleteVendorBoat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVendorBoatParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/boat/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取供应商船舶列表 POST /vendor/boat/list */
export async function getVendorBoats(
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatsVO>("/vendor/boat/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商船舶列表分页 POST /vendor/boat/page */
export async function getVendorBoatsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatsPageParams,
  body: API.BaseBoatsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatsVO>("/vendor/boat/page", {
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
