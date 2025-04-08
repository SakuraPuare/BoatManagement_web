import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 取消订单 POST /vendor/order/cancel/${param0} */
export async function cancelOrder1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrder1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/order/cancel/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 完成订单 POST /vendor/order/complete/${param0} */
export async function completeOrder1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.completeOrder1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/order/complete/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 处理订单 POST /vendor/order/handle/${param0} */
export async function handleOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleOrderParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  const { requestId: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/vendor/order/handle/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家订单列表 POST /vendor/order/list */
export async function getVendorOrdersListQuery(
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatOrdersVO>("/vendor/order/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家订单列表分页 POST /vendor/order/page */
export async function getVendorOrdersPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorOrdersPageQueryParams,
  body: API.BaseBoatOrdersDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatOrdersVO>("/vendor/order/page", {
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
