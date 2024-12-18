import { api } from "@/lib/api";
import { Boat } from "@/types/boat";
import { PaginatedResponse } from "@/types/pagination";
import { toast } from "sonner";

export async function fetchBoatList() {
  const response = await api.get<Boat[]>("/admin/boats/list");
  return response;
}

/**
 * 获取船只列表
 */
export async function fetchBoatListPage(pageNumber: number, pageSize: number) {
  try {
    const response = await api.get<PaginatedResponse<Boat>>(
      "/admin/boats/page",
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
    toast.error("获取船只列表失败");
    throw error;
  }
}

/**
 * 创建船只
 */
export async function createBoat(data: Partial<Boat>) {
  const response = await api.post<boolean>("/admin/boats/save", {
    body: Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    ),
  });

  if (response) {
    toast.success("船只创建成功");
  } else {
    toast.error("船只创建失败");
  }
  return response;
}

/**
 * 更新船只信息
 */
export async function updateBoat(id: string, data: Partial<Boat>) {
  const response = await api.put<boolean>("/admin/boats/update", {
    body: {
      id,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== "",
        ),
      ),
    },
  });

  if (response) {
    toast.success("船只更新成功");
  } else {
    toast.error("船只更新失败");
  }
  return response;
}

/**
 * 删除船只
 */
export async function deleteBoat(id: string) {
  try {
    await api.delete(`/admin/boats/remove/${id}`);
    toast.success("船只删除成功");
  } catch (error) {
    console.error("删除船只失败:", error);
    toast.error("删除失败");
    throw error;
  }
}

/**
 * 更新船只状态
 */
export const updateBoatStatus = async (boatId: number, status: number) => {
  const response = await api.put<boolean>(`/admin/boats/update`, {
    body: {
      boatId,
      status,
    },
  });

  if (response) {
    toast.success("状态更新成功");
  } else {
    toast.error("状态更新失败");
  }
  return response;
};
