"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { cn } from "@/lib/utils";
import { auditAdminUnit } from "@/services/api/adminAudit";
import { adminGetUnitPage } from "@/services/api/adminUnit";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { ShieldQuestion } from "lucide-react";
import { toast } from "sonner";

export default function UnitsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseUnitsVO>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "状态筛选",
        options: [
          { value: "all", label: "全部状态" },
          { value: "APPROVED", label: "已通过" },
          { value: "REJECTED", label: "已驳回" },
          { value: "PENDING", label: "待审核" },
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);

  const fetchUnits = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetUnitPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        filter.filter
      );

      // 处理响应数据的结构
      const responseData = response.data as any;
      setPage({
        pageNumber: responseData?.pageNum || 1,
        pageSize: responseData?.pageSize || 10,
        totalPage: responseData?.totalPage,
        totalRow: responseData?.totalRow,
      });

      setUnits(responseData?.records || []);
    } catch (error) {
      console.error("Failed to fetch units:", error);
      toast.error("获取单位列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const handleApprove = useCallback(
    async (unit: API.BaseUnitsVO) => {
      try {
        const response = await auditAdminUnit({
          id: unit.id || 0,
          types: unit.status === "APPROVED" ? "REJECTED" : "APPROVED",
        });
        if (response.data?.code === 200) {
          toast.success(
            `单位审核${unit.status === "APPROVED" ? "驳回" : "通过"}成功`
          );
          await fetchUnits();
        }
      } catch (error) {
        console.error("Failed to audit unit:", error);
        toast.error("审核操作失败");
      }
    },
    [fetchUnits]
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseUnitsVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "name",
      header: "单位名称",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "socialCreditCode",
      header: "统一信用代码",
      accessorKey: "socialCreditCode",
      enableSorting: false,
    },
    {
      id: "legalPerson",
      header: "法定代表人",
      accessorKey: "legalPerson",
      enableSorting: false,
    },
    {
      id: "contactPhone",
      header: "联系电话",
      accessorKey: "contactPhone",
      enableSorting: false,
    },
    {
      id: "address",
      header: "联系地址",
      accessorKey: "address",
      enableSorting: false,
    },
    {
      id: "types",
      header: "经营类型",
      accessorKey: "types",
      cell: ({ row }) => {
        const value = row.original.types;
        switch (value) {
          case "MERCHANT":
            return "商户";
          case "VENDOR":
            return "供应商";
          default:
            return value;
        }
      },
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const value = row.original.status;
        return (
          <span
            className={cn(
              "px-2 py-1 rounded-md text-sm font-medium",
              value === "APPROVED"
                ? "bg-green-100 text-green-800"
                : value === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {value === "APPROVED"
              ? "已通过"
              : value === "REJECTED"
              ? "已驳回"
              : "待审核"}
          </span>
        );
      },
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
      label: (unit: API.BaseUnitsVO) => {
        const status = unit.status;
        return status === "APPROVED" ? "驳回" : "通过";
      },
      icon: <ShieldQuestion className="h-4 w-4 mr-2" />,
      onClick: handleApprove,
    },
  ];

  return (
    <DataTable<API.BaseUnitsVO>
      title="单位管理"
      loading={isLoading}
      columns={columns}
      actions={actions}
      data={units}
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
  );
}
