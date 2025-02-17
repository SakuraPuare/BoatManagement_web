import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取商家详情 GET /user/merchant/${param0} */
export async function getUserMerchantById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMerchantByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseMerchantsVO>(`/user/merchant/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取商家商品列表 POST /user/merchant/${param0}/goods */
export async function getUserMerchantGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMerchantGoodsListParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  const { merchantId: param0, ...queryParams } = params;
  return request<API.ResponseListBaseGoodsVO>(
    `/user/merchant/${param0}/goods`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 创建商家商品订单 POST /user/merchant/${param0}/goods/order */
export async function createUserMerchantGoodsOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createUserMerchantGoodsOrderParams,
  body: API.BaseGoodsOrdersDTO,
  options?: { [key: string]: any }
) {
  const { merchantId: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/user/merchant/${param0}/goods/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取商家商品列表分页 POST /user/merchant/${param0}/goods/page */
export async function getUserMerchantGoodsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMerchantGoodsPageParams,
  body: API.BaseGoodsDTO,
  options?: { [key: string]: any }
) {
  const { merchantId: param0, ...queryParams } = params;
  return request<API.ResponsePageBaseGoodsVO>(
    `/user/merchant/${param0}/goods/page`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        // pageNum has a default value: 1
        pageNum: "1",
        // pageSize has a default value: 10
        pageSize: "10",
        ...queryParams,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取所有商家列表 POST /user/merchant/list */
export async function getUserMerchantListQuery(
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseMerchantsVO>("/user/merchant/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取所有商家列表分页 POST /user/merchant/page */
export async function getUserMerchantPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMerchantPageQueryParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseMerchantsVO>("/user/merchant/page", {
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
