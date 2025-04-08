import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID获取船舶订单 GET /admin/order/boat/ids */
export async function getBoatOrdersByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatOrdersByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/boat/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取船舶订单列表 GET /admin/order/boat/list */
export async function getBoatOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatOrdersListParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/boat/list", {
    method: "GET",
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

/** 分页获取船舶订单列表 GET /admin/order/boat/page */
export async function getBoatOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBoatOrdersPageParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/admin/order/boat/page", {
    method: "GET",
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

/** 根据ID获取商品订单 GET /admin/order/goods/ids */
export async function getGoodsOrdersByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/goods/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取商品订单列表 GET /admin/order/goods/list */
export async function getGoodsOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersListParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/goods/list", {
    method: "GET",
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

/** 分页获取商品订单列表 GET /admin/order/goods/page */
export async function getGoodsOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersPageParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/admin/order/goods/page", {
    method: "GET",
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
