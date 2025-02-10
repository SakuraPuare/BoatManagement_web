import {Dock} from "@/types/dock";
import {toast} from "sonner";
import {api} from "@/lib/api";

interface DockListResponse {
    records: Dock[];
    totalPage: number;
}

export async function fetchDockList() {
    const response = await api.get<Dock[]>("/admin/docks/list");
    return response;
}

export async function fetchDockListPage(
    page: number,
    pageSize: number,
): Promise<DockListResponse> {
    const response = await api.get<DockListResponse>("/admin/docks/page", {
        params: {
            page: page.toString(),
            pageSize: pageSize.toString(),
        },
    });

    if (!response) {
        toast.error("获取码头列表失败");
    }

    return response;
}

export async function createDock(data: Partial<Dock>): Promise<boolean> {
    const response = await api.post<boolean>("/admin/docks", {
        body: Object.fromEntries(
            Object.entries(data).filter(
                ([_, value]) => value !== undefined && value !== "",
            ),
        ),
    });

    if (response) {
        toast.success("码头创建成功");
    } else {
        toast.error("码头创建失败");
    }
    return response;
}

export async function updateDock(
    dockId: number,
    data: Partial<Dock>,
): Promise<boolean> {
    const response = await api.put<boolean>(`/admin/docks/update`, {
        body: {
            dockId,
            ...Object.fromEntries(
                Object.entries(data).filter(
                    ([_, value]) => value !== undefined && value !== "",
                ),
            ),
        },
    });

    if (response) {
        toast.success("码头更新成功");
    } else {
        toast.error("码头更新失败");
    }
    return response;
}

export async function deleteDock(dockId: number): Promise<boolean> {
    const response = await api.delete<boolean>(`/admin/docks/remove/${dockId}`);
    return response;
}

export async function updateDockStatus(
    dockId: number,
    status: number,
): Promise<boolean> {
    const response = await api.put<boolean>(`/admin/docks/update`, {
        body: {
            dockId,
            status,
        },
    });
    return response;
}
