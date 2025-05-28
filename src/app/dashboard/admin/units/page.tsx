import React, { useCallback, useEffect, useState } from "react";
import {
  Action,
  Column,
  DataManagementTable,
} from "@/components/data-management-table";
import { cn } from "@/lib/utils";
import { auditAdminUnit } from "@/services/api/adminAudit";
import { adminGetUnitPage } from "@/services/api/adminUnit";
import { Building2, ShieldQuestion } from "lucide-react";

("use client");

export default function UnitsPage() {
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUnits = useCallback(async () => {
    const response = await adminGetUnitPage(
      {
        pageNum: currentPage,
        pageSize: 10,
      },
      {
        ...(statusFilter !== "all" && { status: statusFilter }),
      }
    );
    setUnits(response.data?.records || []);
    setTotalPages(response.data?.totalPage || 0);
  }, [statusFilter]);

  useEffect(() => {
    setIsLoading(true);
    fetchUnits();
    setIsLoading(false);
  }, [fetchUnits]);

  const columns: Column<API.BaseUnitsVO>[] = [
    { header: "ID", accessor: "id" },
    { header: "单位名称", accessor: "name" },
    { header: "统一信用代码", accessor: "socialCreditCode" },
    { header: "法定代表人", accessor: "legalPerson" },
    { header: "联系电话", accessor: "contactPhone" },
    { header: "联系地址", accessor: "address" },
    {
      header: "经营类型",
      accessor: "types",
      render: (value) => {
        switch (value) {
          case "MERCHANT":
            return "商户";
          case "VENDOR":
            return "供应商";
          default:
            return value;
        }
      },
    },
    {
      header: "状态",
      accessor: "status",
      render: (value) => {
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
            {value}
          </span>
        );
      },
    },
    { header: "创建时间", accessor: "createdAt" },
    { header: "更新时间", accessor: "updatedAt" },
  ];

  const handleApprove = async (unit: API.BaseUnitsVO) => {
    const response = await auditAdminUnit({
      id: unit.id || 0,
      types: unit.status === "APPROVED" ? "REJECTED" : "APPROVED",
    });
    if (response.data?.code === 200) {
      await fetchUnits();
    }
  };

  const actions: Action<API.BaseUnitsVO>[] = [
    {
      icon: <ShieldQuestion className="h-4 w-4 mr-2" />,
      label: (unit: API.BaseUnitsVO) => {
        const status = unit.status;
        return status === "APPROVED" ? "驳回" : "通过";
      },
      onClick: handleApprove,
    },
  ];

  return (
    <>
      <DataManagementTable
        title="单位管理"
        icon={<Building2 />}
        data={units}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索单位名称..."
        statusFilter={{
          value: statusFilter,
          onChange: (value) => {
            setStatusFilter(
              value as "all" | "APPROVED" | "REJECTED" | "PENDING"
            );
          },
          options: [
            { value: "all", label: "全部状态" },
            { value: "APPROVED", label: "已通过" },
            { value: "REJECTED", label: "已驳回" },
            { value: "PENDING", label: "待审核" },
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: units.length,
          onPageChange: setCurrentPage,
        }}
      />
    </>
  );
}
