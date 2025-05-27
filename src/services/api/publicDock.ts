// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 获取码头详情 GET /public/dock/${param0} */
export async function getPublicDock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicDockParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDocksVO>(`/public/dock/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取码头列表 GET /public/dock/ids */
export async function getPublicDockByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicDockByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/public/dock/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取码头列表 POST /public/dock/list */
export async function getPublicDockList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicDockListParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseDocksVO>("/public/dock/list", {
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

/** 分页获取码头列表 POST /public/dock/page */
export async function getPublicDockPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicDockPageParams,
  body: API.BaseDocksDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseDocksVO>("/public/dock/page", {
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
