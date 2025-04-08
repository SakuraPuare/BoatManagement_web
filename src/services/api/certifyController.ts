import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 加入单位 PUT /certify/join/${param0}/${param1} */
export async function joinUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.joinUnitParams,
  options?: { [key: string]: any }
) {
  const { types: param0, unitId: param1, ...queryParams } = params;
  return request<API.ResponseVoid>(`/certify/join/${param0}/${param1}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 离开单位 DELETE /certify/leave/${param0} */
export async function leaveUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.leaveUnitParams,
  options?: { [key: string]: any }
) {
  const { types: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/certify/leave/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取商户实名认证信息 GET /certify/merchant */
export async function getMerchantCertify(options?: { [key: string]: any }) {
  return request<API.ResponseBaseUnitsVO>("/certify/merchant", {
    method: "GET",
    ...(options || {}),
  });
}

/** 商户实名认证 POST /certify/merchant */
export async function merchantCertify(
  body: API.UnitCertifyRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseVoid>("/certify/merchant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 转让单位 PUT /certify/transfer/${param0}/${param1} */
export async function transferUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.transferUnitParams,
  options?: { [key: string]: any }
) {
  const { types: param0, userId: param1, ...queryParams } = params;
  return request<API.ResponseVoid>(`/certify/transfer/${param0}/${param1}`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户实名认证信息 GET /certify/user */
export async function getUserCertify(options?: { [key: string]: any }) {
  return request<API.ResponseBaseUserCertifyVO>("/certify/user", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户实名认证 POST /certify/user */
export async function userCertify(
  body: API.UserCertifyRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseVoid>("/certify/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取供应商实名认证信息 GET /certify/vendor */
export async function getVendorCertify(options?: { [key: string]: any }) {
  return request<API.ResponseBaseUnitsVO>("/certify/vendor", {
    method: "GET",
    ...(options || {}),
  });
}

/** 供应商实名认证 POST /certify/vendor */
export async function vendorCertify(
  body: API.UnitCertifyRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseVoid>("/certify/vendor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
