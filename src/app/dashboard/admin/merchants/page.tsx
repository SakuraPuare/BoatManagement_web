"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { MERCHANT_CERTIFY_STATUS_MAP } from "@/lib/constants/status";
import { adminGetMerchantPage } from "@/services/api/adminMerchant";
import { adminGetUnitList } from "@/services/api/adminUnit";
import { adminGetUserList } from "@/services/api/adminUser";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { toast } from "sonner";

type MerchantStatus = keyof typeof MERCHANT_CERTIFY_STATUS_MAP;
type Merchant = API.BaseMerchantsVO & {
  user: API.BaseAccountsVO;
  unit: API.BaseUnitsVO;
};

export default function MerchantsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<Merchant>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "状态筛选",
        options: [
          { value: "all", label: "全部状态" },
          ...Object.entries(MERCHANT_CERTIFY_STATUS_MAP).map(
            ([value, config]) => ({
              value: value,
              label: config.label,
            })
          ),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [merchantList, setMerchantList] = useState<Merchant[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [usersResponse, unitsResponse, merchantsResponse] =
        await Promise.all([
          adminGetUserList({}, {}),
          adminGetUnitList({}, {}),
          adminGetMerchantPage(
            {
              pageNum: page.pageNumber || 1,
              pageSize: page.pageSize || 10,
              ...(filter.search && { search: filter.search }),
              ...(filter.sort && { sort: filter.sort }),
              ...(filter.startDateTime && {
                startDateTime: filter.startDateTime,
              }),
              ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
            },
            filter.filter
          ),
        ]);

      const users = (usersResponse.data?.data as API.BaseAccountsVO[]) || [];
      const units = (unitsResponse.data?.data as API.BaseUnitsVO[]) || [];
      const responseData = merchantsResponse.data as any;

      setPage({
        pageNumber: responseData?.pageNum || 1,
        pageSize: responseData?.pageSize || 10,
        totalPage: responseData?.totalPage,
        totalRow: responseData?.totalRow,
      });

      const merchants = responseData?.records || [];
      setMerchants(merchants);
      setUsers(users);
      setUnits(units);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("获取数据失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (users.length > 0 && units.length > 0) {
      const merchantListData = merchants.map((merchant) => {
        const user = users.find((user) => user.id === merchant.userId);
        const unit = units.find((unit) => unit.id === merchant.unitId);
        return {
          ...merchant,
          user: user || ({} as API.BaseAccountsVO),
          unit: unit || ({} as API.BaseUnitsVO),
        };
      });
      setMerchantList(merchantListData);
    }
  }, [users, units, merchants]);

  // Table columns definition
  const columns: ColumnDef<Merchant>[] = [
    {
      id: "id",
      header: "商户ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "username",
      header: "用户名",
      accessorFn: (row) => row.user?.username,
      enableSorting: true,
    },
    {
      id: "unitId",
      header: "单位ID",
      accessorFn: (row) => row.unit?.id,
      enableSorting: true,
    },
    {
      id: "unitName",
      header: "单位名",
      accessorFn: (row) => row.unit?.name,
      enableSorting: true,
    },
    {
      id: "unitAddress",
      header: "单位地址",
      accessorFn: (row) => row.unit?.address,
      enableSorting: false,
    },
    {
      id: "legalPerson",
      header: "法定代表人",
      accessorFn: (row) => row.unit?.legalPerson,
      enableSorting: false,
    },
    {
      id: "contactPhone",
      header: "联系电话",
      accessorFn: (row) => row.unit?.contactPhone,
      enableSorting: false,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status as MerchantStatus;
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

  return (
    <DataTable<Merchant>
      title="商户管理"
      loading={isLoading}
      columns={columns}
      data={merchantList}
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
