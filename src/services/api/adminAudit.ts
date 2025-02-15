
/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

/** 审核操作 PUT /admin/audit/${param0} */
export async function audit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/admin/audit/${param0}`, {
    method: "PUT",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取所有认证列表 GET /admin/audit/list */
export async function list5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list5Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUnitsVO>("/admin/audit/list", {
    method: "GET",
    params: {
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}

/** 获取所有认证列表分页 GET /admin/audit/page */
export async function listPage5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPage5Params,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseUnitsVO>("/admin/audit/page", {
    method: "GET",
    params: {
      // pageNum has a default value: 1
      pageNum: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
      queryDTO: undefined,
      ...params["queryDTO"],
    },
    ...(options || {}),
  });
}
