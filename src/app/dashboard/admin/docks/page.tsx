"use client";

import {
  Action,
  Column,
  DataManagementTable,
} from "@/components/data-management-table";
import {
  deleteAdminDocks,
  getAdminDocksPageQuery,
  updateAdminDocks,
} from "@/services/api/adminDock";
import type { API } from "@/services/api/typings";

import { Anchor, Ban, Pencil, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { DockDialog, dockFormSchema } from "./dock-dialog";

const ITEMS_PER_PAGE = 10;

export default function DocksPage() {
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);
  const [selectedDock, setSelectedDock] = useState<API.BaseDocksVO | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAdminDocksPageQuery(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {
          ...(statusFilter !== "all" && {
            isEnabled: statusFilter === "true",
          }),
        }
      );
      setDocks(response.data?.data?.records || []);
      setTotalPages(response.data?.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  const handleAdd = () => {
    setSelectedDock(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (dock: API.BaseDocksVO) => {
    setSelectedDock(dock);
    setIsDialogOpen(true);
  };

  const handleDelete = async (dockId: number) => {
    try {
      await deleteAdminDocks({ id: dockId });
      await fetchDocks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (dockId: number) => {
    const isEnabled = docks.find((dock) => dock.id === dockId)?.isEnabled;
    try {
      await updateAdminDocks(
        { id: dockId },
        {
          isEnabled: !isEnabled,
        }
      );
      await fetchDocks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocks();
  }, [fetchDocks]);

  const columns: Column<API.BaseDocksVO>[] = [
    { header: "ID", accessor: "id" },
    { header: "名称", accessor: "name" },
    { header: "经度", accessor: "longitude" },
    { header: "纬度", accessor: "latitude" },
    { header: "地址", accessor: "address" },
    { header: "联系电话", accessor: "contactPhone" },
    {
      header: "状态",
      accessor: "isEnabled",
      render: (value) => {
        const isEnabled = value as boolean;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isEnabled
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isEnabled ? "启用" : "禁用"}
          </span>
        );
      },
    },
    { header: "创建时间", accessor: "createdAt" },
    { header: "更新时间", accessor: "updatedAt" },
  ];

  const actions: Action<API.BaseDocksVO>[] = [
    {
      icon: <Pencil className="h-4 w-4 mr-2" />,
      label: "编辑",
      onClick: handleEdit,
    },
    {
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      label: "删除",
      onClick: (dock: API.BaseDocksVO) => handleDelete(dock.id || 0),
    },
    {
      icon: <Ban className="h-4 w-4 mr-2" />,
      label: (dock: API.BaseDocksVO) => (dock.isEnabled ? "禁用" : "启用"),
      onClick: (dock: API.BaseDocksVO) => handleToggleStatus(dock.id || 0),
    },
  ];

  return (
    <>
      <DataManagementTable
        title="码头管理"
        icon={<Anchor className="h-6 w-6" />}
        data={docks}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索用户名、邮箱或电话..."
        dialog={DockDialog}
        schema={dockFormSchema}
        queryFn={async ({ pageNum, pageSize }, searchQuery) => {
          const response = await getAdminDocksPageQuery({ pageNum, pageSize }, {
            name: searchQuery,
          } as API.BaseDocksDTO);
          return {
            list: response.data?.data?.records || [],
            totalItems: response.data?.data?.records?.length || 0,
            totalPages: response.data?.data?.totalPage || 0,
          };
        }}
        statusFilter={{
          value: statusFilter,
          onChange: (value) => setStatusFilter(value),
          options: [
            { value: "all", label: "全部状态" },
            { value: "true", label: "启用" },
            { value: "false", label: "禁用" },
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: docks.length,
          onPageChange: setCurrentPage,
        }}
        onAdd={handleAdd}
      />

      <DockDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchDocks();
          }
          setIsDialogOpen(open);
        }}
        dock={selectedDock}
      />
    </>
  );
}
