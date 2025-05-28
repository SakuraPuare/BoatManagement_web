"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Filter, Page } from "@/components/data-table/types";
import {
  adminCreateDock,
  adminDeleteDock,
  adminGetDockPage,
  adminUpdateDock,
} from "@/services/api/adminDock";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Ban, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 定义码头表单 Zod Schema
export const dockFormSchema = z.object({
  name: z.string().min(1, "码头名称不能为空"),
  longitude: z.number().min(-180).max(180, "经度必须在-180到180之间"),
  latitude: z.number().min(-90).max(90, "纬度必须在-90到90之间"),
  address: z.string().min(1, "地址不能为空"),
  contactPhone: z.string().min(1, "联系电话不能为空"),
  isEnabled: z.boolean(),
});

export type DockFormValues = z.infer<typeof dockFormSchema>;

// 默认表单值
export const defaultDockValues: Partial<DockFormValues> = {
  name: "",
  longitude: 0,
  latitude: 0,
  address: "",
  contactPhone: "",
  isEnabled: true,
};

// 表单字段配置
export const fieldConfigs: Record<keyof DockFormValues, FieldConfig> = {
  name: {
    type: "input",
    label: "码头名称",
    placeholder: "请输入码头名称",
  },
  longitude: {
    type: "number",
    label: "经度",
    placeholder: "请输入经度 (-180 到 180)",
  },
  latitude: {
    type: "number",
    label: "纬度",
    placeholder: "请输入纬度 (-90 到 90)",
  },
  address: {
    type: "input",
    label: "地址",
    placeholder: "请输入码头地址",
  },
  contactPhone: {
    type: "input",
    label: "联系电话",
    placeholder: "请输入联系电话",
  },
  isEnabled: {
    type: "checkbox",
    label: "启用状态",
    placeholder: "是否启用此码头",
  },
};

interface AddEditDockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  dock?: API.BaseDocksVO | null;
}

function AddEditDockDialog({
  open,
  onOpenChange,
  onSuccess,
  dock,
}: AddEditDockDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!dock;

  const formMethods = useForm<DockFormValues>({
    resolver: zodResolver(dockFormSchema),
    defaultValues: isEditing
      ? {
          name: dock?.name || "",
          longitude: dock?.longitude || 0,
          latitude: dock?.latitude || 0,
          address: dock?.address || "",
          contactPhone: dock?.contactPhone || "",
          isEnabled: dock?.isEnabled ?? true,
        }
      : defaultDockValues,
  });

  useEffect(() => {
    if (open) {
      if (isEditing && dock) {
        formMethods.reset({
          name: dock.name || "",
          longitude: dock.longitude || 0,
          latitude: dock.latitude || 0,
          address: dock.address || "",
          contactPhone: dock.contactPhone || "",
          isEnabled: dock.isEnabled ?? true,
        });
      } else {
        formMethods.reset(defaultDockValues);
      }
    }
  }, [dock, open, isEditing, formMethods]);

  const handleSubmit = async (data: DockFormValues) => {
    setIsLoading(true);
    try {
      const payload: API.BaseDocksDTO = {
        name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        address: data.address,
        contactPhone: data.contactPhone,
        isEnabled: data.isEnabled,
      };

      if (isEditing && dock?.id) {
        await adminUpdateDock({ id: dock.id }, payload);
        toast.success("码头更新成功");
      } else {
        await adminCreateDock(payload);
        toast.success("码头创建成功");
      }

      formMethods.reset(defaultDockValues);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to save dock:", error);
      toast.error(isEditing ? "更新码头失败" : "创建码头失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑码头" : "添加码头"}
      description={isEditing ? "修改码头信息" : "请填写码头信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultDockValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={dockFormSchema}
      defaultValues={
        isEditing
          ? {
              name: dock?.name || "",
              longitude: dock?.longitude || 0,
              latitude: dock?.latitude || 0,
              address: dock?.address || "",
              contactPhone: dock?.contactPhone || "",
              isEnabled: dock?.isEnabled ?? true,
            }
          : defaultDockValues
      }
      fieldConfigs={fieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "添加"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={[
        "name",
        "longitude",
        "latitude",
        "address",
        "contactPhone",
        "isEnabled",
      ]}
      key={dock?.id ?? "new"}
    />
  );
}

export default function DocksPage() {
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
        label: "状态筛选",
        options: [
          { value: "all", label: "全部状态" },
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

  // State for add/edit dock dialog
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingDock, setEditingDock] = useState<API.BaseDocksVO | null>(null);

  // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const fetchDocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetDockPage(
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

      const responseData = response.data as any;
      setPage({
        pageNumber: responseData?.pageNum || 1,
        pageSize: responseData?.pageSize || 10,
        totalPage: responseData?.totalPage,
        totalRow: responseData?.totalRow,
      });

      setDocks(responseData?.records || []);
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

  const handleOpenAddEditDialog = useCallback((dock?: API.BaseDocksVO) => {
    setEditingDock(dock || null);
    setIsAddEditDialogOpen(true);
  }, []);

  const handleDeleteDock = useCallback(
    async (dockToDelete: API.BaseDocksVO) => {
      if (!dockToDelete?.id) return;

      setIsDeleting(dockToDelete.id);
      try {
        await adminDeleteDock({ id: dockToDelete.id });
        toast.success(`码头 "${dockToDelete.name}" 删除成功`);
        fetchDocks();
      } catch (error) {
        console.error("Failed to delete dock:", error);
        toast.error(`删除码头 "${dockToDelete.name}" 失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchDocks]
  );

  const handleToggleStatus = useCallback(
    async (dock: API.BaseDocksVO) => {
      if (!dock?.id) return;

      try {
        await adminUpdateDock(
          { id: dock.id },
          {
            isEnabled: !dock.isEnabled,
          }
        );
        toast.success(`码头 "${dock.name}" 状态更新成功`);
        fetchDocks();
      } catch (error) {
        console.error("Failed to toggle dock status:", error);
        toast.error("更新码头状态失败");
      }
    },
    [fetchDocks]
  );

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
      header: "名称",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "longitude",
      header: "经度",
      accessorKey: "longitude",
      enableSorting: true,
    },
    {
      id: "latitude",
      header: "纬度",
      accessorKey: "latitude",
      enableSorting: true,
    },
    {
      id: "address",
      header: "地址",
      accessorKey: "address",
      enableSorting: false,
    },
    {
      id: "contactPhone",
      header: "联系电话",
      accessorKey: "contactPhone",
      enableSorting: false,
    },
    {
      id: "isEnabled",
      header: "状态",
      accessorKey: "isEnabled",
      cell: ({ row }) => {
        const isEnabled = row.original.isEnabled;
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
      label: "编辑",
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: handleOpenAddEditDialog,
      disabled: (row: API.BaseDocksVO) => isDeleting === row.id,
    },
    {
      label: (dock: API.BaseDocksVO) => (dock.isEnabled ? "禁用" : "启用"),
      icon: <Ban className="mr-2 h-4 w-4" />,
      onClick: handleToggleStatus,
      disabled: (row: API.BaseDocksVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDeleteDock,
      className: "text-red-500",
      disabled: (row: API.BaseDocksVO) => !!isDeleting,
      loading: (row: API.BaseDocksVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加码头",
      icon: <PlusCircle />,
      onClick: () => handleOpenAddEditDialog(),
    },
  ];

  return (
    <>
      <AddEditDockDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        onSuccess={() => {
          fetchDocks();
        }}
        dock={editingDock}
      />

      <DataTable<API.BaseDocksVO>
        title="码头管理"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={docks}
        toolbars={toolbars}
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
    </>
  );
}
