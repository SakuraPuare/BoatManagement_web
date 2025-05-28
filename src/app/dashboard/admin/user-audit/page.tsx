import React, { useCallback, useEffect, useState } from "react";

import { adminGetUserCertifyPage } from "@/services/api/adminUser";
import { auditAdminUser } from "@/services/api/adminAudit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



const ITEMS_PER_PAGE = 10;

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
  const [certifications, setCertifications] = useState<API.BaseUserCertifyVO[]>(
    []
  );
  const [selectedCertification, setSelectedCertification] =
    useState<API.BaseUserCertifyVO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | CertifyStatus>(
    "all"
  );

  const fetchCertifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetUserCertifyPage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {
          ...(statusFilter !== "all" && { status: statusFilter }),
        }
      );
      if (response.data?.records) {
        setCertifications(response.data.records);
        setTotalPages(response.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取认证列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const handleAudit = async (id: number, status: "APPROVED" | "REJECTED") => {
    try {
      await auditAdminUser({ id, types: status });
      toast.success(`审核${status === "APPROVED" ? "通过" : "拒绝"}成功`);
      await fetchCertifications();
    } catch (error) {
      console.error(error);
      toast.error("审核操作失败");
    }
  };

  const handleViewDetail = (certification: API.BaseUserCertifyVO) => {
    setSelectedCertification(certification);
    setIsDetailDialogOpen(true);
  };

  const columns: Column<API.BaseUserCertifyVO>[] = [
    {
      accessor: "id",
      header: "ID",
    },
    {
      accessor: "realName",
      header: "真实姓名",
    },
    {
      accessor: "idCard",
      header: "身份证号",
      render: (value: string) => {
        if (!value) return "-";
        return value.replace(/(\d{6})\d{8}(\d{4})/, "$1********$2");
      },
    },
    {
      accessor: "status",
      header: "审核状态",
      render: (value: CertifyStatus) => {
        const status = STATUS_MAP[value] || STATUS_MAP.PENDING;
        return <Badge variant={status.variant}>{status.label}</Badge>;
      },
    },
    {
      accessor: "createdAt",
      header: "申请时间",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
    {
      accessor: "updatedAt",
      header: "更新时间",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  const actions: Action<API.BaseUserCertifyVO>[] = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewDetail,
    },
    {
      label: "审核通过",
      icon: <UserCheck className="w-4 h-4" />,
      onClick: (item) => handleAudit(item.id!, "APPROVED"),
      show: (item) => item.status === "PENDING",
    },
    {
      label: "审核拒绝",
      icon: <UserX className="w-4 h-4" />,
      onClick: (item) => handleAudit(item.id!, "REJECTED"),
      show: (item) => item.status === "PENDING",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">用户认证审核</h1>
          <p className="text-muted-foreground">管理用户实名认证申请</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as "all" | CertifyStatus)
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="PENDING">待审核</SelectItem>
            <SelectItem value="APPROVED">已通过</SelectItem>
            <SelectItem value="REJECTED">已拒绝</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataManagementTable<API.BaseUserCertifyVO>
        title="用户认证审核"
        icon={<UserCheck className="h-5 w-5" />}
        data={certifications}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        searchPlaceholder="搜索用户姓名或身份证号..."
        pagination={{
          currentPage,
          totalPages,
          totalItems: totalPages * ITEMS_PER_PAGE,
          onPageChange: setCurrentPage,
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
                      handleAudit(selectedCertification.id!, "APPROVED");
                      setIsDetailDialogOpen(false);
                    }}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    通过
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      handleAudit(selectedCertification.id!, "REJECTED");
                      setIsDetailDialogOpen(false);
                    }}
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
    </div>
  );
}
