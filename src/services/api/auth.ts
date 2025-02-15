/* eslint-disable */
import request from "@/utils/request";
import API from "./typings";

/** 检查用户名是否可用 POST /auth/availability */
export async function checkAvailability(
  body: API.NameRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseBoolean>("/auth/availability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /auth/code */
export async function sendCode(
  body: API.NameRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseString>("/auth/code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码登录 POST /auth/login */
export async function loginWithPassword(
  body: API.AuthRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseTokenVO>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码登录 POST /auth/login/code */
export async function loginByCode(
  body: API.AuthRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseTokenVO>("/auth/login/code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信登录 POST /auth/login/wechat */
export async function loginByWechat(
  body: API.WxLoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseTokenVO>("/auth/login/wechat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码注册 POST /auth/register */
export async function registerWithPassword(
  body: API.AuthRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseTokenVO>("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信登录 POST /auth/wx/login */
export async function wxLogin(
  body: API.WxLoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseTokenVO>("/auth/wx/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
