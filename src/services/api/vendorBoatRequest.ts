// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 根据ID获取商家船只请求 GET /vendor/boat/request/ids */
export async function vendorGetBoatRequestByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorGetBoatRequestByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/vendor/boat/request/ids",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取商家船只请求列表 POST /vendor/boat/request/list */
export async function getVendorBoatRequestsListQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatRequestsListQueryParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseBoatRequestsVO>(
    "/vendor/boat/request/list",
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

/** 获取商家船只请求列表分页 POST /vendor/boat/request/page */
export async function getVendorBoatRequestsPageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVendorBoatRequestsPageQueryParams,
  body: API.BaseBoatRequestsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseBoatRequestsVO>(
    "/vendor/boat/request/page",
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

/** 更新商家船只请求状态 PUT /vendor/boat/request/status/${param0} */
export async function vendorUpdateBoatRequestStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.vendorUpdateBoatRequestStatusParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBoatRequestsVO>(
    `/vendor/boat/request/status/${param0}`,
    {
      method: "PUT",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}
