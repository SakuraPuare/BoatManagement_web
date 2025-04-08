import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 取消商品订单 PUT /admin/goods-order/${param0}/cancel */
export async function cancelOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/goods-order/${param0}/cancel`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 完成商品订单 PUT /admin/goods-order/${param0}/complete */
export async function completeOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.completeOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/goods-order/${param0}/complete`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取商品订单 GET /admin/goods-order/ids */
export async function getGoodsOrdersByIds1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersByIds1Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/admin/goods-order/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取商品订单列表 GET /admin/goods-order/list */
export async function getGoodsOrdersList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersList1Params,
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/admin/goods-order/list", {
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

/** 分页获取商品订单列表 GET /admin/goods-order/page */
export async function getGoodsOrdersPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsOrdersPage1Params,
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsOrdersVO>("/admin/goods-order/page", {
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
