// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 获取商品详情 GET /public/goods/${param0} */
export async function getPublicGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGoodsVO>(`/public/goods/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取商品列表 GET /public/goods/ids */
export async function getPublicGoodsByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicGoodsByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/public/goods/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取商品列表 POST /public/goods/list */
export async function getPublicGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicGoodsListParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/public/goods/list", {
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

/** 分页获取商品列表 POST /public/goods/page */
export async function getPublicGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicGoodsPageParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsVO>("/public/goods/page", {
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
