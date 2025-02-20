"use client";
import { DataManagementTable, Column, Action } from "@/components/data-management-table";
import { Store, Pencil, Trash2, Ban } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { MerchantDialog } from "./merchant-dialog";
import { merchantFormSchema } from "./merchant-dialog";
import {
  deleteAdminMerchant,
  getAdminMerchantPageQuery,
  updateAdminMerchant,
} from "@/services/api/adminMerchant";
import type { API } from "@/services/api/typings";
import { MERCHANT_CERTIFY_STATUS_MAP } from "@/lib/constants/status";

type MerchantStatus = keyof typeof MERCHANT_CERTIFY_STATUS_MAP;

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<API.BaseMerchantsVO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | MerchantStatus>("all");

  const fetchMerchants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAdminMerchantPageQuery(
        { pageNum: currentPage, pageSize: 10 },
        { status: statusFilter === "all" ? undefined : statusFilter }
      );
      setMerchants(response.data?.data?.records || []);
      setTotalPages(response.data?.data?.totalPage || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  const handleAdd = () => {
    setSelectedMerchant(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (merchant: API.BaseMerchantsVO) => {
    setSelectedMerchant(merchant);
    setIsDialogOpen(true);
  };

  const handleDelete = async (merchantId: number) => {
    try {
      await deleteAdminMerchant({ id: merchantId });
      await fetchMerchants();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (merchantId: number) => {
    const isBlocked = merchants.find((merchant) => merchant.id === merchantId)?.status === "BLOCKED";
    try {
      await updateAdminMerchant({ id: merchantId }, { status: !isBlocked ? "BLOCKED" : "ACTIVE" });
      await fetchMerchants();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  const columns: Column<API.BaseMerchantsVO>[] = [
    { header: "商户ID", accessor: "id" },
    { header: "用户ID", accessor: "userId" },
    { header: "单位ID", accessor: "unitId" },
    {
      header: "状态",
      accessor: "status",
      render: (value) => {
        const status = value as MerchantStatus;
        const statusConfig = MERCHANT_CERTIFY_STATUS_MAP[status];
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusConfig?.color || "bg-gray-100 text-gray-800"
            }`}
          >
            {statusConfig?.label || "未知状态"}
          </span>
        );
      },
    },
    { 
      header: "创建时间", 
      accessor: "createdAt",
      render: (value) => new Date(value as string).toLocaleString('zh-CN'),
    },
    { 
      header: "更新时间", 
      accessor: "updatedAt",
      render: (value) => new Date(value as string).toLocaleString('zh-CN'),
    },
  ];

  const actions: Action<API.BaseMerchantsVO>[] = [
    {
      icon: <Pencil className="h-4 w-4 mr-2" />,
      label: "编辑",
      onClick: handleEdit,
    },
    {
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      label: "删除",
      onClick: (merchant: API.BaseMerchantsVO) => handleDelete(merchant.id || 0),
    },
    {
      icon: <Ban className="h-4 w-4 mr-2" />,
      label: (merchant: API.BaseMerchantsVO) => {
        const status = merchant.status as MerchantStatus;
        return status === "REJECTED" ? "重新审核" : "拒绝";
      },
      onClick: (merchant: API.BaseMerchantsVO) => handleBlock(merchant.id || 0),
    },
  ];

  return (
    <>
      <DataManagementTable
        title="商户管理"
        icon={<Store className="h-6 w-6" />}
        data={merchants}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索商户ID..."
        dialog={MerchantDialog}
        schema={merchantFormSchema}
        queryFn={async ({ pageNum, pageSize }, searchQuery) => {
          const response = await getAdminMerchantPageQuery(
            { pageNum, pageSize },
            { userId: searchQuery ? parseInt(searchQuery) : undefined } as API.BaseMerchantsDTO
          );
          return {
            list: response.data?.data?.records || [],
            totalItems: response.data?.data?.records?.length || 0,
            totalPages: response.data?.data?.totalPage || 0,
          };
        }}
        statusFilter={{
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as "all" | MerchantStatus),
          options: [
            { value: "all", label: "全部状态" },
            ...Object.entries(MERCHANT_CERTIFY_STATUS_MAP).map(([value, config]) => ({
              value: value,
              label: config.label,
            })),
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: merchants.length,
          onPageChange: setCurrentPage,
        }}
        onAdd={handleAdd}
      />

      <MerchantDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchMerchants();
          }
          setIsDialogOpen(open);
        }}
        merchant={selectedMerchant}
      />
    </>
  );
} 