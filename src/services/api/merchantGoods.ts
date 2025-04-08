import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 添加商品 POST /merchant/goods/ */
export async function merchantCreateGoods(
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/merchant/goods/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商品详情 GET /merchant/goods/${param0} */
export async function merchantGetGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantGetGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGoodsVO>(`/merchant/goods/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新商品 PUT /merchant/goods/${param0} */
export async function merchantUpdateGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantUpdateGoodsParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/goods/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除商品 DELETE /merchant/goods/${param0} */
export async function merchantDeleteGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantDeleteGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/goods/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取商家商品列表 POST /merchant/goods/list */
export async function merchantGetGoodsList(
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/merchant/goods/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家商品列表分页 POST /merchant/goods/page */
export async function merchantGetGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.merchantGetGoodsPageParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsVO>("/merchant/goods/page", {
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
