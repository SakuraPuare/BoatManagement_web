// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 取消用户船舶订单 PUT /user/order/boat/cancel/${param0} */
export async function userCancelBoatOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userCancelBoatOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/user/order/boat/cancel/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户船舶订单列表 GET /user/order/boat/list */
export async function userGetBoatOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatOrdersListParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/user/order/boat/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户船舶订单列表分页 GET /user/order/boat/page */
export async function userGetBoatOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetBoatOrdersPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/user/order/boat/page", {
    method: "GET",
    params: {
      // pageNum has a default value: 1
      pageNum: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
    },
    ...(options || {}),
  });
}

/** 支付用户船舶订单 PUT /user/order/boat/pay/${param0} */
export async function userPayBoatOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userPayBoatOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/user/order/boat/pay/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消用户商品订单 PUT /user/order/goods/cancel/${param0} */
export async function userCancelGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userCancelGoodsOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/user/order/goods/cancel/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户商品订单列表 GET /user/order/goods/list */
export async function userGetGoodsOrdersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetGoodsOrdersListParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsOrdersVO>("/user/order/goods/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户商品订单列表分页 GET /user/order/goods/page */
export async function userGetGoodsOrdersPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetGoodsOrdersPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsOrdersVO>("/user/order/goods/page", {
    method: "GET",
    params: {
      // pageNum has a default value: 1
      pageNum: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
    },
    ...(options || {}),
  });
}

/** 支付用户商品订单 PUT /user/order/goods/pay/${param0} */
export async function userPayGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userPayGoodsOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/user/order/goods/pay/${param0}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}
