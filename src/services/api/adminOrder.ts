// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 根据 ID 获取船舶订单 GET /admin/order/boat/ids */
export async function adminGetBoatOrdersByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatOrdersByIdsParams,
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

/** 获取船舶订单列表 POST /admin/order/boat/list */
export async function adminGetBoatOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatOrdersListParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/boat/list", {
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

/** 分页获取船舶订单列表 POST /admin/order/boat/page */
export async function adminGetBoatOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatOrdersPageParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/admin/order/boat/page", {
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

/** 根据 ID 获取商品订单 GET /admin/order/goods/ids */
export async function adminGetGoodsOrdersByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsOrdersByIdsParams,
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

/** 获取商品订单列表 POST /admin/order/goods/list */
export async function adminGetGoodsOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsOrdersListParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/admin/order/goods/list", {
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

/** 分页获取商品订单列表 POST /admin/order/goods/page */
export async function adminGetGoodsOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsOrdersPageParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/admin/order/goods/page", {
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
