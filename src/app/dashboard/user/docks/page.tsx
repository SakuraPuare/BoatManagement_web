import React, { useCallback, useEffect, useState } from "react";

import { userGetDockPage } from "@/services/api/userDock";
import { Badge } from "@/components/ui/badge";
import { Anchor, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const ITEMS_PER_PAGE = 10;

export default function UserDocksPage() {
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "enabled" | "disabled"
  >("all");

  const fetchDocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userGetDockPage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {
          ...(statusFilter === "enabled" && { isEnabled: true }),
          ...(statusFilter === "disabled" && { isEnabled: false }),
        }
      );
      if (response.data?.records) {
        setDocks(response.data.records);
        setTotalPages(response.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取码头列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchDocks();
  }, [fetchDocks]);

  const columns: Column<API.BaseDocksVO>[] = [
    {
      accessor: "id",
      header: "ID",
    },
    {
      accessor: "name",
      header: "码头名称",
    },
    {
      accessor: "address",
      header: "地址",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{value || "-"}</span>
        </div>
      ),
    },
    {
      accessor: "contactPhone",
      header: "联系电话",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{value || "-"}</span>
        </div>
      ),
    },
    {
      accessor: "longitude",
      header: "经度",
      render: (value: number) => value?.toFixed(6) || "-",
    },
    {
      accessor: "latitude",
      header: "纬度",
      render: (value: number) => value?.toFixed(6) || "-",
    },
    {
      accessor: "isEnabled",
      header: "状态",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "启用" : "禁用"}
        </Badge>
      ),
    },
    {
      accessor: "createdAt",
      header: "创建时间",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">码头信息</h1>
          <p className="text-muted-foreground">查看可用的码头信息和位置</p>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="flex items-center space-x-4">
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as "all" | "enabled" | "disabled")
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="enabled">启用</SelectItem>
            <SelectItem value="disabled">禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataManagementTable<API.BaseDocksVO>
        title="码头列表"
        icon={<Anchor className="w-5 h-5" />}
        data={docks}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="搜索码头名称或地址..."
        pagination={{
          currentPage,
          totalPages,
          totalItems: totalPages * ITEMS_PER_PAGE,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
