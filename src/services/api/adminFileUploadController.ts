// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 此处后端没有提供注释 POST /admin/file-uploads */
export async function createFileUpload(
  body: API.BaseFileUploadsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseFileUploadsVO>("/admin/file-uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin/file-uploads/${param0} */
export async function updateFileUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateFileUploadParams,
  body: API.BaseFileUploadsDTO,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseFileUploadsVO>(
    `/admin/file-uploads/${param0}`,
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

/** 此处后端没有提供注释 DELETE /admin/file-uploads/${param0} */
export async function deleteFileUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFileUploadParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/admin/file-uploads/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/file-uploads/ids */
export async function getFileUploadsByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileUploadsByIdsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseFileUploadsVO>("/admin/file-uploads/ids", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/file-uploads/list */
export async function getFileUploadsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileUploadsListParams,
  body: API.BaseFileUploadsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseFileUploadsVO>(
    "/admin/file-uploads/list",
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

/** 此处后端没有提供注释 POST /admin/file-uploads/page */
export async function getFileUploadsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileUploadsPageParams,
  body: API.BaseFileUploadsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponsePageBaseFileUploadsVO>(
    "/admin/file-uploads/page",
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
