"use client";

import { Store } from "lucide-react";
import type { API } from "@/services/api/typings";
import { 
  getUserMerchantPageQuery, 
  getUserMerchantGoodsPage,
  createUserMerchantGoodsOrder 
} from "@/services/api/userMerchant";
import { DataManagementTable, type Column } from "@/components/data-management-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { TableRow } from "@/components/data-management-table";

const columns: Column<API.BaseMerchantsVO>[] = [
  {
    accessor: "id",
    header: "商家ID",
  },
  {
    accessor: "unitId",
    header: "单位ID",
  },
  {
    accessor: "status",
    header: "状态",
    render: (status) => (
      <span className={status === "ENABLED" ? "text-green-600" : "text-red-600"}>
        {status === "ENABLED" ? "正常" : "禁用"}
      </span>
    ),
  },
  {
    accessor: "id.",
    header: "操作",
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

export default function UserMerchantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DataManagementTable
    
      title="商家列表"
      icon={<Store className="h-6 w-6" />}
      columns={columns}
      isLoading={isLoading}
      searchPlaceholder="搜索商家..."
      queryFn={async ({ pageNum, pageSize }, searchQuery) => {
        const response = await getUserMerchantPageQuery(
          { pageNum, pageSize },
          { status: searchQuery } as API.BaseMerchantsDTO
        );
        return {
          list: response.data?.data?.records || [],
          totalItems: response.data?.data?.records?.length || 0,
          totalPages: response.data?.data?.totalPage || 0,
        };
      }}
      pagination={{
        currentPage,
        totalPages: 1,
        totalItems: 0,
        onPageChange: setCurrentPage,
      }}
    />
  );
} 