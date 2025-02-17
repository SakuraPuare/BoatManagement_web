import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取供应商码头 GET /vendor/dock/${param0} */
export async function getVendorDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorDockParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/vendor/dock/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取供应商码头列表 获取供应商码头列表 POST /vendor/dock/list */
export async function getVendorDockListQuery(
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/vendor/dock/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商码头分页列表 获取供应商码头分页列表 POST /vendor/dock/page */
export async function getVendorDockPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorDockPageQueryParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/vendor/dock/page", {
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
