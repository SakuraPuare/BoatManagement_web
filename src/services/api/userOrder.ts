import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 取消用户船舶订单 POST /user/order/boat/cancel/${param0} */
export async function cancelUserBoatOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelUserBoatOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/order/boat/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户船舶订单列表 POST /user/order/boat/list */
export async function getUserBoatOrdersListQuery(
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/user/order/boat/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户船舶订单列表分页 POST /user/order/boat/page */
export async function getUserBoatOrdersPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBoatOrdersPageQueryParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/user/order/boat/page", {
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

/** 支付用户船舶订单 POST /user/order/boat/pay/${param0} */
export async function payUserBoatOrders(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payUserBoatOrdersParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/order/boat/pay/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消用户商品订单 POST /user/order/goods/cancel/${param0} */
export async function cancelUserGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelUserGoodsOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/order/goods/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户商品订单列表 POST /user/order/goods/list */
export async function getUserGoodsOrdersListQuery(
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/user/order/goods/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户商品订单列表分页 POST /user/order/goods/page */
export async function getUserGoodsOrdersPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGoodsOrdersPageQueryParams,
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsOrdersVO>("/user/order/goods/page", {
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

/** 支付用户商品订单 POST /user/order/goods/pay/${param0} */
export async function payUserGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payUserGoodsOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/order/goods/pay/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}
