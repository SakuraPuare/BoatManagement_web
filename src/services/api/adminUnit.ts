import type { API } from "./typings";
/* eslint-disable */
import request from "@/utils/request";

/** 获取单位详情 GET /admin/unit/${param0} */
export async function getAdminUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUnitParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUnitsVO>(`/admin/unit/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取单位列表 POST /admin/unit/list */
export async function getAdminUnitListQuery(
  body: API.BaseUnitsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUnitsVO>("/admin/unit/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单位列表分页 POST /admin/unit/page */
export async function getAdminUnitPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUnitPageQueryParams,
  body: API.BaseUnitsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseUnitsVO>("/admin/unit/page", {
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
