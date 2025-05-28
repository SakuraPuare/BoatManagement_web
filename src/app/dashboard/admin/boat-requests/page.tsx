import React, { useCallback, useEffect, useState } from "react";

import {
  adminDeleteBoatRequest,
  adminGetBoatRequestPage,
} from "@/services/api/adminBoatRequest";
import { adminGetDockList } from "@/services/api/adminDock";
import { adminGetUserList } from "@/services/api/adminUser";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BOAT_ORDER_STATUS_MAP,
  BOAT_ORDER_TYPE_MAP,
} from "@/lib/constants/status";



const ITEMS_PER_PAGE = 10;

type RequestStatus = keyof typeof BOAT_ORDER_STATUS_MAP;
type RequestType = keyof typeof BOAT_ORDER_TYPE_MAP;

type BoatRequestWithDetails = API.BaseBoatRequestsVO & {
  user?: API.BaseAccountsVO;
  startDock?: API.BaseDocksVO;
  endDock?: API.BaseDocksVO;
};

export default function AdminBoatRequestsPage() {
  const [requests, setRequests] = useState<API.BaseBoatRequestsVO[]>([]);
  const [requestsWithDetails, setRequestsWithDetails] = useState<
    BoatRequestWithDetails[]
  >([]);
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<BoatRequestWithDetails | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatus>(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<"all" | RequestType>("all");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [requestsResponse, usersResponse, docksResponse] =
        await Promise.all([
          adminGetBoatRequestPage(
            { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
            {
              ...(statusFilter !== "all" && { status: statusFilter }),
              ...(typeFilter !== "all" && { type: typeFilter }),
            }
          ),
          adminGetUserList({}, {}),
          adminGetDockList({}, {}),
        ]);

      if (requestsResponse.data?.records) {
        setRequests(requestsResponse.data.records);
        setTotalPages(requestsResponse.data.totalPage || 0);
      }
      setUsers(usersResponse.data || []);
      setDocks(docksResponse.data || []);
    } catch (error) {
      console.error(error);
      toast.error("获取船舶预订列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter, typeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (users.length > 0 && docks.length > 0) {
      const requestsWithDetails = requests.map((request) => {
        const user = users.find((u) => u.id === request.userId);
        const startDock = docks.find((d) => d.id === request.startDockId);
        const endDock = docks.find((d) => d.id === request.endDockId);
        return { ...request, user, startDock, endDock };
      });
      setRequestsWithDetails(requestsWithDetails);
    }
  }, [requests, users, docks]);

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteBoatRequest({ id });
      toast.success("删除成功");
      await fetchData();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  const handleViewDetail = (request: BoatRequestWithDetails) => {
    setSelectedRequest(request);
    setIsDetailDialogOpen(true);
  };

  const columns: Column<BoatRequestWithDetails>[] = [
    {
      key: "id",
      title: "ID",
      width: "80px",
    },
    {
      key: "user",
      title: "用户",
      width: "120px",
      render: (user: API.BaseAccountsVO) => user?.username || "-",
    },
    {
      key: "startDock",
      title: "起始码头",
      width: "120px",
      render: (dock: API.BaseDocksVO) => dock?.name || "-",
    },
    {
      key: "endDock",
      title: "目标码头",
      width: "120px",
      render: (dock: API.BaseDocksVO) => dock?.name || "-",
    },
    {
      key: "type",
      title: "预订类型",
      width: "100px",
      render: (value: RequestType) => {
        const type = BOAT_ORDER_TYPE_MAP[value];
        return type ? <Badge variant="outline">{type.label}</Badge> : "-";
      },
    },
    {
      key: "status",
      title: "状态",
      width: "100px",
      render: (value: RequestStatus) => {
        const status = BOAT_ORDER_STATUS_MAP[value];
        return status ? (
          <Badge variant={status.variant}>{status.label}</Badge>
        ) : (
          "-"
        );
      },
    },
    {
      key: "startTime",
      title: "开始时间",
      width: "160px",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
    {
      key: "endTime",
      title: "结束时间",
      width: "160px",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
    {
      key: "createdAt",
      title: "创建时间",
      width: "160px",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  const actions: Action<BoatRequestWithDetails>[] = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewDetail,
    },
    {
      label: "删除",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (item) => handleDelete(item.id!),
      variant: "destructive",
    },
  ];

  const filters = [
    {
      key: "status",
      label: "状态",
      value: statusFilter,
      onChange: (value: string) =>
        setStatusFilter(value as "all" | RequestStatus),
      options: [
        { label: "全部", value: "all" },
        ...Object.entries(BOAT_ORDER_STATUS_MAP).map(([key, value]) => ({
          label: value.label,
          value: key,
        })),
      ],
    },
    {
      key: "type",
      label: "类型",
      value: typeFilter,
      onChange: (value: string) => setTypeFilter(value as "all" | RequestType),
      options: [
        { label: "全部", value: "all" },
        ...Object.entries(BOAT_ORDER_TYPE_MAP).map(([key, value]) => ({
          label: value.label,
          value: key,
        })),
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">船舶预订管理</h1>
          <p className="text-muted-foreground">管理所有船舶预订申请</p>
        </div>
      </div>

      <DataManagementTable
        data={requestsWithDetails}
        columns={columns}
        actions={actions}
        filters={filters}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
        searchPlaceholder="搜索用户名或码头名称..."
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>预订详情</DialogTitle>
            <DialogDescription>查看船舶预订申请详细信息</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">预订ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.user?.username || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">起始码头</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.startDock?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">目标码头</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.endDock?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">预订类型</label>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {BOAT_ORDER_TYPE_MAP[selectedRequest.type as RequestType]
                        ?.label || "未知"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">状态</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        BOAT_ORDER_STATUS_MAP[
                          selectedRequest.status as RequestStatus
                        ]?.variant || "outline"
                      }
                    >
                      {BOAT_ORDER_STATUS_MAP[
                        selectedRequest.status as RequestStatus
                      ]?.label || "未知"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">开始时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.startTime
                      ? new Date(selectedRequest.startTime).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">结束时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.endTime
                      ? new Date(selectedRequest.endTime).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.createdAt
                      ? new Date(selectedRequest.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">更新时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.updatedAt
                      ? new Date(selectedRequest.updatedAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
