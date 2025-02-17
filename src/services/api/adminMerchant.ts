import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 创建商户 POST /admin/merchant/ */
export async function createAdminMerchant(
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/admin/merchant/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商户详情 GET /admin/merchant/${param0} */
export async function getAdminMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminMerchantParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseMerchantsVO>(`/admin/merchant/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新商户 PUT /admin/merchant/${param0} */
export async function updateAdminMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminMerchantParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/merchant/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除商户 DELETE /admin/merchant/${param0} */
export async function deleteAdminMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminMerchantParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/merchant/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取商户列表 POST /admin/merchant/list */
export async function getAdminMerchantListQuery(
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseMerchantsVO>("/admin/merchant/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商户列表分页 POST /admin/merchant/page */
export async function getAdminMerchantPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminMerchantPageQueryParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseMerchantsVO>("/admin/merchant/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      // page has a default value: 1
      page: "1",
      // size has a default value: 10
      size: "10",
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
