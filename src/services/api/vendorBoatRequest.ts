import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取商家船只请求列表 POST /vendor/boat/request/list */
export async function getVendorBoatRequestsListQuery(
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/vendor/boat/request/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取商家船只请求列表分页 POST /vendor/boat/request/page */
export async function getVendorBoatRequestsPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatRequestsPageQueryParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatRequestsVO>(
    "/vendor/boat/request/page",
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
