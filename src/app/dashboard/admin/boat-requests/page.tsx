"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
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
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

type RequestStatus = keyof typeof BOAT_ORDER_STATUS_MAP;
type RequestType = keyof typeof BOAT_ORDER_TYPE_MAP;

type BoatRequestWithDetails = API.BaseBoatRequestsVO & {
  user?: API.BaseAccountsVO;
  startDock?: API.BaseDocksVO;
  endDock?: API.BaseDocksVO;
};

export default function AdminBoatRequestsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<BoatRequestWithDetails>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "预订状态",
        options: [
          { label: "全部", value: "" },
          ...Object.entries(BOAT_ORDER_STATUS_MAP).map(([key, value]) => ({
            label: value.label,
            value: key,
          })),
        ],
      },
      {
        id: "type",
        label: "预订类型",
        options: [
          { label: "全部", value: "" },
          ...Object.entries(BOAT_ORDER_TYPE_MAP).map(([key, value]) => ({
            label: value.label,
            value: key,
          })),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [requestsWithDetails, setRequestsWithDetails] = useState<
    BoatRequestWithDetails[]
  >([]);

  // State for related data
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  // State for detail dialog
  const [selectedRequest, setSelectedRequest] =
    useState<BoatRequestWithDetails | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // State for delete operations
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch related data (users and docks)
  const fetchRelatedData = useCallback(async () => {
    try {
      const [usersResponse, docksResponse] = await Promise.all([
        adminGetUserList({}, {}),
        adminGetDockList({}, {}),
      ]);

      setUsers((usersResponse.data as API.BaseAccountsVO[]) || []);
      setDocks((docksResponse.data as API.BaseDocksVO[]) || []);
    } catch (error) {
      console.error("Failed to fetch related data:", error);
    }
  }, []);

  // Fetch boat requests data
  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminGetBoatRequestPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        {
          ...(filter.filter.status && { status: filter.filter.status }),
          ...(filter.filter.type && { type: filter.filter.type }),
        }
      );

      const pageData = res.data as any;
      setPage({
        pageNumber: pageData?.pageNum || pageData?.pageNumber || 1,
        pageSize: pageData?.pageSize || 10,
        totalPage: pageData?.totalPage,
        totalRow: pageData?.totalRow,
      });

      // Map requests with user and dock details
      const requestsWithDetails = (pageData?.records || []).map(
        (request: API.BaseBoatRequestsVO) => {
          const user = users.find((u) => u.id === request.userId);
          const startDock = docks.find((d) => d.id === request.startDockId);
          const endDock = docks.find((d) => d.id === request.endDockId);
          return { ...request, user, startDock, endDock };
        }
      );

      setRequestsWithDetails(requestsWithDetails);
    } catch (error) {
      console.error("Failed to fetch boat requests:", error);
      toast.error("获取船舶预订列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize, users, docks]);

  // Load related data on component mount
  useEffect(() => {
    fetchRelatedData();
  }, [fetchRelatedData]);

  // Load requests when dependencies change
  useEffect(() => {
    if (users.length > 0 && docks.length > 0) {
      fetchRequests();
    }
  }, [fetchRequests, users.length, docks.length]);

  // Handle delete request
  const handleDelete = useCallback(
    async (request: BoatRequestWithDetails) => {
      if (!request?.id) return;

      if (!confirm("确定要删除这个预订申请吗？")) return;

      setIsDeleting(request.id);
      try {
        await adminDeleteBoatRequest({ id: request.id });
        toast.success("删除成功");
        fetchRequests(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete request:", error);
        toast.error("删除失败");
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchRequests]
  );

  // Handle view detail
  const handleViewDetail = useCallback((request: BoatRequestWithDetails) => {
    setSelectedRequest(request);
    setIsDetailDialogOpen(true);
  }, []);

  // Table columns definition
  const columns: ColumnDef<BoatRequestWithDetails>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "user",
      header: "用户",
      accessorFn: (row) => row.user?.username,
      cell: ({ row }) => row.original.user?.username || "-",
      enableSorting: true,
    },
    {
      id: "startDock",
      header: "起始码头",
      accessorFn: (row) => row.startDock?.name,
      cell: ({ row }) => row.original.startDock?.name || "-",
      enableSorting: true,
    },
    {
      id: "endDock",
      header: "目标码头",
      accessorFn: (row) => row.endDock?.name,
      cell: ({ row }) => row.original.endDock?.name || "-",
      enableSorting: true,
    },
    {
      id: "type",
      header: "预订类型",
      accessorKey: "type",
      cell: ({ row }) => {
        const type = BOAT_ORDER_TYPE_MAP[row.original.type as RequestType];
        return type ? <Badge variant="outline">{type.label}</Badge> : "-";
      },
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status =
          BOAT_ORDER_STATUS_MAP[row.original.status as RequestStatus];
        return status ? (
          <Badge variant="outline" className={status.color}>
            {status.label}
          </Badge>
        ) : (
          "-"
        );
      },
      enableSorting: true,
    },
    {
      id: "startTime",
      header: "开始时间",
      cell: ({ row }) =>
        row.original.startTime
          ? formatDate(row.original.startTime, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
    {
      id: "endTime",
      header: "结束时间",
      cell: ({ row }) =>
        row.original.endTime
          ? formatDate(row.original.endTime, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      cell: ({ row }) =>
        row.original.createdAt
          ? formatDate(row.original.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions
  const actions = [
    {
      label: "查看详情",
      icon: <Eye className="mr-2 h-4 w-4" />,
      onClick: handleViewDetail,
      disabled: (row: BoatRequestWithDetails) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDelete,
      className: "text-red-500",
      disabled: (row: BoatRequestWithDetails) => !!isDeleting,
      loading: (row: BoatRequestWithDetails) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  return (
    <>
      <DataTable<BoatRequestWithDetails>
        title="船舶预订管理"
        description="管理所有船舶预订申请"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={requestsWithDetails}
        page={page}
        onPageChange={(pageNumber) => {
          setPage({ ...page, pageNumber });
        }}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage({ ...page, pageNumber: 1 }); // 筛选变化时重置页码
        }}
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
                      variant="outline"
                      className={
                        BOAT_ORDER_STATUS_MAP[
                          selectedRequest.status as RequestStatus
                        ]?.color || ""
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
    </>
  );
}
