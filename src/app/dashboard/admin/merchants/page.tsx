import React, { useCallback, useEffect, useState } from "react";

import { MERCHANT_CERTIFY_STATUS_MAP } from "@/lib/constants/status";
import { adminGetMerchantPage } from "@/services/api/adminMerchant";
import { adminGetUnitList } from "@/services/api/adminUnit";
import { adminGetUserList } from "@/services/api/adminUser";
import { Store } from "lucide-react";



type MerchantStatus = keyof typeof MERCHANT_CERTIFY_STATUS_MAP;
type Merchant = API.BaseMerchantsVO & {
  user: API.BaseAccountsVO;
  unit: API.BaseUnitsVO;
};

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [merchantList, setMerchantList] = useState<Merchant[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | MerchantStatus>(
    "all"
  );

  const fetchData = useCallback(async () => {
    const users =
      ((await adminGetUserList({}, {})).data as API.BaseAccountsVO[]) || [];
    const units =
      ((await adminGetUnitList({}, {})).data as API.BaseUnitsVO[]) || [];
    const response = await adminGetMerchantPage(
      {
        pageNum: currentPage,
        pageSize: 10,
      },
      {
        ...(statusFilter !== "all" && { status: statusFilter }),
      }
    );
    const merchants = (response.data as API.PageBaseMerchantsVO)?.records || [];
    setMerchants(merchants);
    setUsers(users);
    setUnits(units);
  }, [currentPage, statusFilter]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (users.length > 0 && units.length > 0) {
      const merchantList = merchants.map((merchant) => {
        const user = users.find((user) => user.id === merchant.userId);
        const unit = units.find((unit) => unit.id === merchant.unitId);
        return { ...merchant, user: user || {}, unit: unit || {} };
      });
      setMerchantList(merchantList);
      setIsLoading(false);
    }
  }, [users, units, merchants]);

  const columns: Column<Merchant>[] = [
    { header: "商户ID", accessor: "id" },
    { header: "用户名", accessor: "user.username" },
    { header: "单位ID", accessor: "unit.id" },
    { header: "单位名", accessor: "unit.name" },
    { header: "单位地址", accessor: "unit.address" },
    { header: "法定代表人", accessor: "unit.legalPerson" },
    { header: "联系电话", accessor: "unit.contactPhone" },
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
    { header: "创建时间", accessor: "createdAt" },
    { header: "更新时间", accessor: "updatedAt" },
  ];

  return (
    <>
      <DataManagementTable
        title="商户管理"
        icon={<Store className="h-6 w-6" />}
        data={merchantList}
        isLoading={isLoading}
        columns={columns}
        searchPlaceholder="搜索商户..."
        statusFilter={{
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as "all" | MerchantStatus),
          options: [
            { value: "all", label: "全部状态" },
            ...Object.entries(MERCHANT_CERTIFY_STATUS_MAP).map(
              ([value, config]) => ({
                value: value,
                label: config.label,
              })
            ),
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: merchants.length,
          onPageChange: setCurrentPage,
        }}
      />
    </>
  );
}
