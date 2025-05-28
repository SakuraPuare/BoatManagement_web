"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { adminGetUserCertifyPage } from "@/services/api/adminUser";
import { auditAdminUser } from "@/services/api/adminAudit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

type CertifyStatus = "PENDING" | "APPROVED" | "REJECTED";

const STATUS_MAP: Record<
  CertifyStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING: { label: "待审核", variant: "outline" },
  APPROVED: { label: "已通过", variant: "default" },
  REJECTED: { label: "已拒绝", variant: "destructive" },
};

export default function UserAuditPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseUserCertifyVO>>({
    filter: {},
    filterOptions: [
      { label: "全部", value: "" },
      { label: "待审核", value: "PENDING" },
      { label: "已通过", value: "APPROVED" },
      { label: "已拒绝", value: "REJECTED" },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [certifications, setCertifications] = useState<API.BaseUserCertifyVO[]>(
    []
  );

  // State for detail dialog
  const [selectedCertification, setSelectedCertification] =
    useState<API.BaseUserCertifyVO | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // State for audit operations
  const [isAuditing, setIsAuditing] = useState<number | null>(null);

  // Fetch certifications data
  const fetchCertifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminGetUserCertifyPage(
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
        }
      );

      setPage({
        pageNumber: res.data?.pageNum || 1,
        pageSize: res.data?.pageSize || 10,
        totalPage: res.data?.totalPage,
        totalRow: res.data?.totalRow,
      });

      setCertifications(res.data?.records || []);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
      toast.error("获取认证列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  // Handle audit operations
  const handleAudit = useCallback(
    async (
      certification: API.BaseUserCertifyVO,
      status: "APPROVED" | "REJECTED"
    ) => {
      if (!certification?.id) return;

      setIsAuditing(certification.id);
      try {
        await auditAdminUser({ id: certification.id, types: status });
        toast.success(`审核${status === "APPROVED" ? "通过" : "拒绝"}成功`);
        fetchCertifications(); // Refresh the list
      } catch (error) {
        console.error("Failed to audit:", error);
        toast.error("审核操作失败");
      } finally {
        setIsAuditing(null);
      }
    },
    [fetchCertifications]
  );

  // Handle view detail
  const handleViewDetail = useCallback(
    (certification: API.BaseUserCertifyVO) => {
      setSelectedCertification(certification);
      setIsDetailDialogOpen(true);
    },
    []
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseUserCertifyVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "realName",
      header: "真实姓名",
      accessorKey: "realName",
      enableSorting: true,
    },
    {
      id: "idCard",
      header: "身份证号",
      accessorKey: "idCard",
      cell: ({ row }) => {
        const value = row.original.idCard;
        if (!value) return "-";
        return value.replace(/(\d{6})\d{8}(\d{4})/, "$1********$2");
      },
      enableSorting: false,
    },
    {
      id: "status",
      header: "审核状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status =
          STATUS_MAP[row.original.status as CertifyStatus] ||
          STATUS_MAP.PENDING;
        return <Badge variant={status.variant}>{status.label}</Badge>;
      },
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "申请时间",
      cell: ({ row }) =>
        row.original.createdAt
          ? formatDate(row.original.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
    {
      id: "updatedAt",
      header: "更新时间",
      cell: ({ row }) =>
        row.original.updatedAt
          ? formatDate(row.original.updatedAt, "yyyy-MM-dd HH:mm:ss")
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
      disabled: (row: API.BaseUserCertifyVO) => isAuditing === row.id,
    },
    {
      label: "审核通过",
      icon: <UserCheck className="mr-2 h-4 w-4 text-green-500" />,
      onClick: (row: API.BaseUserCertifyVO) => handleAudit(row, "APPROVED"),
      className: "text-green-500",
      disabled: (row: API.BaseUserCertifyVO) =>
        row.status !== "PENDING" || !!isAuditing,
      loading: (row: API.BaseUserCertifyVO) => isAuditing === row.id,
      loadingText: "审核中...",
    },
    {
      label: "审核拒绝",
      icon: <UserX className="mr-2 h-4 w-4 text-red-500" />,
      onClick: (row: API.BaseUserCertifyVO) => handleAudit(row, "REJECTED"),
      className: "text-red-500",
      disabled: (row: API.BaseUserCertifyVO) =>
        row.status !== "PENDING" || !!isAuditing,
      loading: (row: API.BaseUserCertifyVO) => isAuditing === row.id,
      loadingText: "审核中...",
    },
  ];

  return (
    <>
      <DataTable<API.BaseUserCertifyVO>
        title="用户认证审核"
        description="管理用户实名认证申请"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={certifications}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>认证详情</DialogTitle>
            <DialogDescription>查看用户认证申请详细信息</DialogDescription>
          </DialogHeader>
          {selectedCertification && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">真实姓名</label>
                <p className="text-sm text-muted-foreground">
                  {selectedCertification.realName || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">身份证号</label>
                <p className="text-sm text-muted-foreground">
                  {selectedCertification.idCard || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">审核状态</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      STATUS_MAP[selectedCertification.status as CertifyStatus]
                        ?.variant || "outline"
                    }
                  >
                    {STATUS_MAP[selectedCertification.status as CertifyStatus]
                      ?.label || "未知"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">申请时间</label>
                <p className="text-sm text-muted-foreground">
                  {selectedCertification.createdAt
                    ? new Date(selectedCertification.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>
              {selectedCertification.status === "PENDING" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    onClick={() => {
                      handleAudit(selectedCertification, "APPROVED");
                      setIsDetailDialogOpen(false);
                    }}
                    disabled={!!isAuditing}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    通过
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      handleAudit(selectedCertification, "REJECTED");
                      setIsDetailDialogOpen(false);
                    }}
                    disabled={!!isAuditing}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    拒绝
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
