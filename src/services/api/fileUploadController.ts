// @ts-ignore
/* eslint-disable */
import request from "@/lib/request";

/** 此处后端没有提供注释 DELETE /files/${param0} */
export async function deleteFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFileParams,
  options?: { [key: string]: any }
) {
  const { fileId: param0, ...queryParams } = params;
  return request<API.ResponseVoid>(`/files/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /files/business */
export async function getFilesByBusiness(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFilesByBusinessParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseFileUploadsVO>("/files/business", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /files/download/${param0} */
export async function downloadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadFileParams,
  options?: { [key: string]: any }
) {
  const { fileId: param0, ...queryParams } = params;
  return request<string>(`/files/download/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /files/preview/${param0} */
export async function previewFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.previewFileParams,
  options?: { [key: string]: any }
) {
  const { fileId: param0, ...queryParams } = params;
  return request<string>(`/files/preview/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /files/upload */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.ResponseBaseFileUploadsVO>("/files/upload", {
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

/** 此处后端没有提供注释 POST /files/upload/batch */
export async function uploadFiles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFilesParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseFileUploadsVO>("/files/upload/batch", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /files/user/list */
export async function getUserFilesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserFilesListParams,
  body: API.BaseFileUploadsDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseListBaseFileUploadsVO>("/files/user/list", {
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
