// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建船只请求 POST /admin/boat/request/ */
export async function adminCreateBoatRequest(
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseBoatRequestsVO>("/admin/boat/request/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取船只请求详情 GET /admin/boat/request/${param0} */
export async function adminGetBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatRequestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/admin/boat/request/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 更新船只请求 PUT /admin/boat/request/${param0} */
export async function adminUpdateBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateBoatRequestParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/admin/boat/request/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 删除船只请求 DELETE /admin/boat/request/${param0} */
export async function adminDeleteBoatRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteBoatRequestParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/boat/request/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取船只请求列表 GET /admin/boat/request/ids */
export async function adminGetBoatRequestByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatRequestByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/admin/boat/request/ids",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取船只请求列表 POST /admin/boat/request/list */
export async function adminGetBoatRequestList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatRequestListParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/admin/boat/request/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 分页获取船只请求列表 POST /admin/boat/request/page */
export async function adminGetBoatRequestPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetBoatRequestPageParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatRequestsVO>(
    "/admin/boat/request/page",
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

        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}
