"use client";

import { Store, ShoppingCart } from "lucide-react";
import { getUserMerchantPageQuery } from "@/services/api/userMerchant";
import { DataManagementTable, type Column, type TableRow } from "@/components/data-management-table";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 10;

export default function UserMerchantsPage() {
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMerchants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUserMerchantPageQuery(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        { status: "APPROVED" } as API.BaseMerchantsDTO // 只获取已通过审核的商家
      );
      if (response.data?.records) {
        setMerchants(response.data.records);
        setTotalPages(response.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  const columns: Column<API.BaseMerchantsVO>[] = [
    {
      accessor: "id",
      header: "商家名称",
      render: (id) => {
        return `商家${id}`;
      },
    },
    {
      accessor: "unitId",
      header: "单位ID",
    },
    {
      accessor: "id.",
      header: "",
      render: (_: any, row?: TableRow<API.BaseMerchantsVO>) => {
        if (!row) return null;
        return (
          <div className="flex justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = `/dashboard/user/merchants/${row.data.id}/goods`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              查看商品
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataManagementTable
      title="商家列表"
      icon={<Store className="h-6 w-6" />}
      data={merchants}
      columns={columns}
      isLoading={isLoading}
      searchPlaceholder="搜索商家..."
      onSearch={setSearchQuery}
      pagination={{
        currentPage,
        totalPages,
        totalItems: merchants.length,
        onPageChange: setCurrentPage,
      }}
    />
  );
} 