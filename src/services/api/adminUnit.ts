// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建单位 POST /admin/unit/ */
export async function createUnit(
  body: API.BaseUnitsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseUnitsVO>("/admin/unit/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单位详情 GET /admin/unit/${param0} */
export async function getUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnitParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUnitsVO>(`/admin/unit/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新单位 PUT /admin/unit/${param0} */
export async function updateUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUnitParams,
  body: API.BaseUnitsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUnitsVO>(`/admin/unit/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除单位 DELETE /admin/unit/${param0} */
export async function deleteUnit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUnitParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/unit/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取单位列表 GET /admin/unit/ids */
export async function getUnitByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnitByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUnitsVO>("/admin/unit/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取单位列表 POST /admin/unit/list */
export async function getUnitList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnitListParams,
  body: API.BaseUnitsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUnitsVO>("/admin/unit/list", {
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

/** 分页获取单位列表 POST /admin/unit/page */
export async function getUnitPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnitPageParams,
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
