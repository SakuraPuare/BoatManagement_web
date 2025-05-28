"use client";

import React, { useCallback, useEffect, useState } from "react";
import { userGetDockPage } from "@/services/api/userDock";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Badge } from "@/components/ui/badge";
import { Anchor, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export default function UserDocksPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseDocksVO>>({
    filter: {},
    filterOptions: [
      {
        id: "isEnabled",
        label: "状态",
        options: [
          { value: "all", label: "全部" },
          { value: "true", label: "启用" },
          { value: "false", label: "禁用" },
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  const fetchDocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const enabledValue = String(filter.filter.isEnabled || "");
      const response = await userGetDockPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        {
          ...(enabledValue === "true" && { isEnabled: true }),
          ...(enabledValue === "false" && { isEnabled: false }),
        }
      );

      if (response.data) {
        const pageData = response.data as API.PageBaseDocksVO;
        setPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        setDocks(pageData.records || []);
      }
    } catch (error) {
      console.error("Failed to fetch docks:", error);
      toast.error("获取码头列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchDocks();
  }, [fetchDocks]);

  // Table columns definition
  const columns: ColumnDef<API.BaseDocksVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "name",
      header: "码头名称",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "address",
      header: "地址",
      accessorKey: "address",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{row.original.address || "-"}</span>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "contactPhone",
      header: "联系电话",
      accessorKey: "contactPhone",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{row.original.contactPhone || "-"}</span>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "longitude",
      header: "经度",
      accessorKey: "longitude",
      cell: ({ row }) => row.original.longitude?.toFixed(6) || "-",
      enableSorting: true,
    },
    {
      id: "latitude",
      header: "纬度",
      accessorKey: "latitude",
      cell: ({ row }) => row.original.latitude?.toFixed(6) || "-",
      enableSorting: true,
    },
    {
      id: "isEnabled",
      header: "状态",
      accessorKey: "isEnabled",
      cell: ({ row }) => (
        <Badge variant={row.original.isEnabled ? "default" : "secondary"}>
          {row.original.isEnabled ? "启用" : "禁用"}
        </Badge>
      ),
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString()
          : "-",
      enableSorting: true,
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

      <DataTable<API.BaseDocksVO>
        title="码头列表"
        description={
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5" />
            <span>查看可用的码头信息和位置</span>
          </div>
        }
        loading={isLoading}
        columns={columns}
        data={docks}
        page={page}
        onPageChange={(pageNumber) => {
          setPage({ ...page, pageNumber });
        }}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage({ ...page, pageNumber: 1 });
        }}
      />
    </div>
  );
}
