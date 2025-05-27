// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建商户 POST /admin/merchant/ */
export async function adminCreateMerchant(
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseMerchantsVO>("/admin/merchant/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商户详情 GET /admin/merchant/${param0} */
export async function adminGetMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetMerchantParams,
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
export async function adminUpdateMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateMerchantParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseMerchantsVO>(`/admin/merchant/${param0}`, {
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
export async function adminDeleteMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteMerchantParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/merchant/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取商户列表 GET /admin/merchant/ids */
export async function adminGetMerchantByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetMerchantByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseMerchantsVO>("/admin/merchant/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取商户列表 POST /admin/merchant/list */
export async function adminGetMerchantList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetMerchantListParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseMerchantsVO>("/admin/merchant/list", {
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

/** 分页获取商户列表 POST /admin/merchant/page */
export async function adminGetMerchantPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetMerchantPageParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseMerchantsVO>("/admin/merchant/page", {
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
