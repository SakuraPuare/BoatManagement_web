"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ShoppingCart, Store } from "lucide-react";
import { getUserMerchantPageQuery } from "@/services/api/userMerchant";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UserMerchantsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseMerchantsVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);

  const fetchMerchants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUserMerchantPageQuery(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        { status: "APPROVED", ...filter.filter } as API.BaseMerchantsDTO
      );

      if (response.data) {
        const pageData = response.data as API.PageBaseMerchantsVO;
        setPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        setMerchants(pageData.records || []);
      }
    } catch (error) {
      console.error("Failed to fetch merchants:", error);
      toast.error("获取商家列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  // Table columns definition
  const columns: ColumnDef<API.BaseMerchantsVO>[] = [
    {
      id: "id",
      header: "商家ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "merchantName",
      header: "商家名称",
      accessorKey: "id",
      cell: ({ row }) => `商家${row.original.id}`,
      enableSorting: false,
    },
    {
      id: "unitId",
      header: "单位ID",
      accessorKey: "unitId",
      enableSorting: true,
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              (window.location.href = `/dashboard/user/merchants/${row.original.id}/goods`)
            }
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            查看商品
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  return (
    <DataTable<API.BaseMerchantsVO>
      title="商家列表"
      description={
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span>浏览已认证的商家信息</span>
        </div>
      }
      loading={isLoading}
      columns={columns}
      data={merchants}
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
