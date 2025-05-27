// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建商品 POST /admin/goods/ */
export async function adminCreateGoods(
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseGoodsVO>("/admin/goods/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商品详情 GET /admin/goods/${param0} */
export async function adminGetGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGoodsVO>(`/admin/goods/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新商品 PUT /admin/goods/${param0} */
export async function adminUpdateGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateGoodsParams,
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
export async function adminDeleteGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteGoodsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/goods/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取商品列表 GET /admin/goods/ids */
export async function adminGetGoodsByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsByIdsParams,
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

/** 获取商品列表 POST /admin/goods/list */
export async function adminGetGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsListParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseGoodsVO>("/admin/goods/list", {
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

/** 分页获取商品列表 POST /admin/goods/page */
export async function adminGetGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetGoodsPageParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseGoodsVO>("/admin/goods/page", {
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
