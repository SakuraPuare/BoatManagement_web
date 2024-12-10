import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/config/routes";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = Cookies.get("user") !== undefined;

  // const permissions = Cookies.get('permissions') || [];

  // API 认证路由跳过检查
  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // 公开路由检查
  const isPublicRoute = publicRoutes.includes(pathname);
  if (isPublicRoute) {
    // 如果用户已登录且访问登录页，重定向到默认页面
    if (isLoggedIn && pathname === "/login") {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
    }
    return NextResponse.next();
  }

  // 认证路由检查
  if (!isLoggedIn && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 检查用户权限
  // const userPermissions = request.cookies.get('user-permissions')?.value;
  // if (userPermissions) {
  //   const permissions = JSON.parse(userPermissions);
  //   // 这里可以根据路由和权限实现更细粒度的控制
  //   // 例如检查用户是否有访问特定路由的权限
  //   if (!hasRequiredPermissions(pathname, permissions)) {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   }
  // }

  return NextResponse.next();
}

// function hasRequiredPermissions(pathname: string, permissions: string[]): boolean {
//     // 在这里实现具体的权限检查逻辑
//     // 例如：特定路由需要特定权限
//     const routePermissions: Record<string, string[]> = {
//         '/dashboard': ['view_dashboard'],
//         '/profile': ['view_profile'],
//         // 添加更多路由权限配置
//     };

//     const requiredPermissions = routePermissions[pathname];
//     if (!requiredPermissions) return true; // 如果没有配置权限要求，默认允许访问

//     return requiredPermissions.some(permission => permissions.includes(permission));
// }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
