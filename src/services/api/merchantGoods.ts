/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

/** 添加商品 POST /merchant/goods/ */
export async function addMerchantsGoods(
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
export async function getGoodsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsByIdParams,
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
export async function updateMerchantsGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMerchantsGoodsParams,
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
export async function deleteMerchantsGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMerchantsGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/merchant/goods/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取商家商品列表 GET /merchant/goods/list */
export async function getGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/merchant/goods/list", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}

/** 获取商家商品列表分页 GET /merchant/goods/page */
export async function getGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsVO>("/merchant/goods/page", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}
