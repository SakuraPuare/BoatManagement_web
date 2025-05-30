// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 创建用户 POST /admin/user */
export async function adminCreateUser(
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseAccountsVO>("/admin/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 GET /admin/user/${param0} */
export async function adminGetUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseAccountsVO>(`/admin/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 PUT /admin/user/${param0} */
export async function adminUpdateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminUpdateUserParams,
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseAccountsVO>(`/admin/user/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin/user/${param0} */
export async function adminDeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminDeleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/user/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据 ID 获取用户认证列表 GET /admin/user/certify/ids */
export async function adminGetUserCertifyByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserCertifyByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUserCertifyVO>("/admin/user/certify/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户认证列表 POST /admin/user/certify/list */
export async function adminGetUserCertifyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserCertifyListParams,
  body: API.BaseUserCertifyDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseUserCertifyVO>(
    "/admin/user/certify/list",
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

/** 分页获取用户认证列表 POST /admin/user/certify/page */
export async function adminGetUserCertifyPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserCertifyPageParams,
  body: API.BaseUserCertifyDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseUserCertifyVO>(
    "/admin/user/certify/page",
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

/** 获取用户认证详情 GET /admin/user/certify/user/${param0} */
export async function adminGetUserCertify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserCertifyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUserCertifyVO>(
    `/admin/user/certify/user/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据 ID 获取用户列表 GET /admin/user/ids */
export async function adminGetUserByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseAccountsVO>("/admin/user/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户列表 POST /admin/user/list */
export async function adminGetUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserListParams,
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseAccountsVO>("/admin/user/list", {
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

/** 分页获取用户列表 POST /admin/user/page */
export async function adminGetUserPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetUserPageParams,
  body: API.BaseAccountsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseAccountsVO>("/admin/user/page", {
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
