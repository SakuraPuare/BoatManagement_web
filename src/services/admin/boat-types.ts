import { api } from "@/lib/api";
import { BoatType } from "@/types/boat-type";
import { PaginatedResponse } from "@/types/pagination";
import { toast } from "sonner";

/**
 * 获取船型列表
 */
export async function fetchBoatTypeList(pageNumber: number, pageSize: number) {
  try {
    const response = await api.get<PaginatedResponse<BoatType>>("/admin/boatTypes/page", {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    toast.error("获取船型列表失败");
    throw error;
  }
}

/**
 * 创建船型
 */
export async function createBoatType(data: Partial<BoatType>) {
  const response = await api.post<boolean>("/admin/boatTypes/save", {
    body: Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    ),
  });

  if (response) {
    toast.success("船型创建成功");
  } else {
    toast.error("船型创建失败");
  }
  return response;
}

/**
 * 更新船型信息
 */
export async function updateBoatType(boatTypeId: number, data: Partial<BoatType>) {
  const response = await api.put<boolean>("/admin/boatTypes/update", {
    body: {
      boatTypeId,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== "",
        ),
      ),
    },
  });

  if (response) {
    toast.success("船型更新成功");
  } else {
    toast.error("船型更新失败");
  }
  return response;
}

/**
 * 删除船型
 */
export async function deleteBoatType(boatTypeId: number) {
  try {
    await api.delete(`/admin/boatTypes/remove/${boatTypeId}`);
    toast.success("船型删除成功");
  } catch (error) {
    console.error("删除船型失败:", error);
    toast.error("删除失败");
    throw error;
  }
}

/**
 * 禁用船型
 */
export async function updateBoatTypeBlockStatus(
  boatTypeId: number,
  status: number,
) {
  const action = status === 1 ? "禁用" : "启用";

  try {
    const response = await api.put<boolean>("/admin/boatTypes/update", {
      body: {
        boatTypeId,
        status: status === 1 ? 0 : 1,
      },
    });
    if (response) {
      toast.success(`船型${action}成功`);
    } else {
      toast.error(`船型${action}失败`);
    }
    return response;
  } catch (error) {
    console.error(error);
    toast.error("更新失败");
    throw error;
  }
}
