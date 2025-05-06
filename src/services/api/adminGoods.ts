// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建商品 POST /admin/goods */
export async function createGoods(
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseGoodsVO>("/admin/goods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新商品 PUT /admin/goods/${param0} */
export async function updateGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateGoodsParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGoodsVO>(`/admin/goods/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除商品 DELETE /admin/goods/${param0} */
export async function deleteGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/goods/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取商品 GET /admin/goods/ids */
export async function getGoodsByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/admin/goods/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取商品列表 GET /admin/goods/list */
export async function getGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsListParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/admin/goods/list", {
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

/** 分页获取商品列表 GET /admin/goods/page */
export async function getGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsPageParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsVO>("/admin/goods/page", {
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
