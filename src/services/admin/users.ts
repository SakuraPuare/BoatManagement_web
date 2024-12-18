import { api } from "@/lib/api";
import { UserSelf } from "@/types/user";
import { PaginatedResponse } from "@/types/pagination";
import { toast } from "sonner";

export async function fetchUserList() {
  const response = await api.get<UserSelf[]>("/admin/users/list");
  return response;
}

/**
 * 获取用户列表
 */
export async function fetchUserListPage(pageNumber: number, pageSize: number) {
  try {
    const response = await api.get<PaginatedResponse<UserSelf>>(
      "/admin/users/page",
      {
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    toast.error("获取用户列表失败");
    throw error;
  }
}

/**
 * 创建用户
 */
export async function createUser(data: Partial<UserSelf>) {
  const response = await api.post<boolean>("/admin/users/save", {
    body: Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    ),
  });

  if (response) {
    toast.success("用户创建成功");
  } else {
    toast.error("用户创建失败");
  }
  return response;
}

/**
 * 更新用户信息
 */
export async function updateUser(userId: number, data: Partial<UserSelf>) {
  const response = await api.put<boolean>("/admin/users/update", {
    body: {
      userId,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== "",
        ),
      ),
    },
  });

  if (response) {
    toast.success("用户更新成功");
  } else {
    toast.error("用户更新失败");
  }
  return response;
}

/**
 * 删除用户
 */
export async function deleteUser(userId: number) {
  try {
    await api.delete(`/admin/users/remove/${userId}`);
    toast.success("用户删除成功");
  } catch (error) {
    console.error("删除用户失败:", error);
    toast.error("删除失败");
    throw error;
  }
}

/**
 * 更新用户封禁状态
 */
export async function updateUserBlockStatus(
  userId: number,
  isBlocked: boolean,
) {
  const action = isBlocked ? "解禁" : "封禁";
  try {
    const response = await api.put<boolean>("/admin/users/update", {
      body: {
        userId,
        isBlocked: !isBlocked,
      },
    });
    if (response) {
      toast.success(`用户${action}成功`);
    } else {
      toast.error(`用户${action}失败`);
    }
    return response;
  } catch (error) {
    console.error(`${action}用户失败:`, error);
    toast.error(`${action}失败`);
    throw error;
  }
}

/**
 * 更新用户权限
 */
export async function updateUserRoles(userId: number, role: number) {
  const response = await api.put<boolean>("/admin/users/update", {
    body: {
      userId,
      role,
    },
  });

  if (response) {
    toast.success("权限更新成功");
  } else {
    toast.error("权限更新失败");
  }
  return response;
}
