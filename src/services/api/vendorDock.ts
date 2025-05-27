// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 获取供应商码头详情 GET /vendor/dock/${param0} */
export async function getDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDockParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/vendor/dock/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据ID获取供应商码头列表 GET /vendor/dock/ids */
export async function getDockByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDockByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/vendor/dock/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取供应商码头列表 POST /vendor/dock/list */
export async function getDockList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDockListParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/vendor/dock/list", {
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

/** 分页获取供应商码头列表 POST /vendor/dock/page */
export async function getDockPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDockPageParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/vendor/dock/page", {
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
