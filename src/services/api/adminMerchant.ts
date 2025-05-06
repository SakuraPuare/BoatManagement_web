// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建商户 POST /admin/merchant */
export async function createMerchant(
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseMerchantsVO>("/admin/merchant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商户详情 GET /admin/merchant/${param0} */
export async function getMerchantById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMerchantByIdParams,
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
export async function updateMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMerchantParams,
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
export async function deleteMerchant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMerchantParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/merchant/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取商户 GET /admin/merchant/ids */
export async function getMerchantByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMerchantByIdsParams,
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

/** 获取商户列表 GET /admin/merchant/list */
export async function getMerchantList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMerchantListParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseMerchantsVO>("/admin/merchant/list", {
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

/** 分页获取商户列表 GET /admin/merchant/page */
export async function getMerchantPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMerchantPageParams,
  body: API.BaseMerchantsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseMerchantsVO>("/admin/merchant/page", {
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
