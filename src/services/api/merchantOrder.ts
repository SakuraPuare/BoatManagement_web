// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/*
 * 商品订单管理
 */

/** 获取商家商品订单列表 POST /merchant/order/goods/list */
export async function merchantGetGoodsOrdersList(
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/merchant/order/goods/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家商品订单列表分页 POST /merchant/order/goods/page */
export async function merchantGetGoodsOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantGetOrdersPageParams & {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  },
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsOrdersVO>("/merchant/order/goods/page", {
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

/** 完成商品订单 POST /merchant/order/goods/complete/${param0} */
export async function merchantCompleteGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantCompleteOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/order/goods/complete/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消商品订单 POST /merchant/order/goods/cancel/${param0} */
export async function merchantCancelGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantCancelOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/order/goods/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/*
 * 兼容性API（保持向后兼容）
 */

/** 获取商家订单列表 POST /merchant/order/list */
export async function merchantGetOrdersList(
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/merchant/order/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家订单列表分页 POST /merchant/order/page */
export async function merchantGetOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantGetOrdersPageParams,
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsOrdersVO>("/merchant/order/page", {
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

/** 完成订单 POST /merchant/order/complete/${param0} */
export async function merchantCompleteOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantCompleteOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/order/complete/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消订单 POST /merchant/order/cancel/${param0} */
export async function merchantCancelOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantCancelOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/order/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}
