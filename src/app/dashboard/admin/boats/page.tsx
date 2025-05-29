"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { adminGetUnitList } from "@/services/api/adminUnit";
import { adminGetBoatPage } from "@/services/api/adminBoat";
import { adminGetBoatTypeList } from "@/services/api/adminBoatType";
import { adminGetDockList } from "@/services/api/adminDock";
import { adminGetVendorList } from "@/services/api/adminVendor";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { BoatDialog } from "./boat-dialog";

type BoatVO = {
  boat: API.BaseBoatsVO;
  boatType: API.BaseBoatTypesVO;
  dock: API.BaseDocksVO;
  unit: API.BaseUnitsVO;
  vendor: API.BaseVendorsVO;
};

export default function BoatsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<BoatVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [boats, setBoats] = useState<BoatVO[]>([]);
  const [baseBoats, setBaseBoats] = useState<API.BaseBoatsVO[]>([]);
  const [boatTypes, setBoatTypes] = useState<API.BaseBoatTypesVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);
  const [vendors, setVendors] = useState<API.BaseVendorsVO[]>([]);

  // State for boat dialog
  const [isBoatDialogOpen, setIsBoatDialogOpen] = useState(false);
  const [editingBoat, setEditingBoat] = useState<API.BaseBoatsVO | null>(null);

  const fetchBoats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetBoatPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        {} as API.BaseBoatsDTO
      );

      const responseData = response.data as any;
      console.log(responseData);
      setPage({
        pageNumber: responseData?.pageNumber || 1,
        pageSize: responseData?.pageSize || 10,
        totalPage: responseData?.totalPage,
        totalRow: responseData?.totalRow,
      });

      setBaseBoats(responseData?.records || []);
    } catch (error) {
      console.error("Failed to fetch boats:", error);
      toast.error("获取船只列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  const fetchBoatTypes = useCallback(async () => {
    try {
      const response = await adminGetBoatTypeList({}, {});
      console.log("Boat types response:", response.data);
      setBoatTypes((response.data as any) || []);
    } catch (error) {
      console.error("Failed to fetch boat types:", error);
      toast.error("获取船只类型失败");
    }
  }, []);

  const fetchDocks = useCallback(async () => {
    try {
      const response = await adminGetDockList({}, {});
      console.log("Docks response:", response.data);
      setDocks((response.data as any) || []);
    } catch (error) {
      console.error("Failed to fetch docks:", error);
      toast.error("获取码头列表失败");
    }
  }, []);

  const fetchUnits = useCallback(async () => {
    try {
      const response = await adminGetUnitList({}, {});
      console.log("Units response:", response.data);
      setUnits((response.data as any) || []);
    } catch (error) {
      console.error("Failed to fetch units:", error);
      toast.error("获取单位列表失败");
    }
  }, []);

  const fetchVendors = useCallback(async () => {
    try {
      const response = await adminGetVendorList({}, {});
      console.log("Vendors response:", response.data);
      setVendors((response.data as any) || []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
      toast.error("获取供应商列表失败");
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchBoatTypes(),
      fetchDocks(),
      fetchUnits(),
      fetchVendors(),
      fetchBoats(),
    ]);
  }, [fetchBoatTypes, fetchDocks, fetchUnits, fetchVendors, fetchBoats]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (baseBoats.length > 0) {
      console.log("开始映射船只数据...");
      console.log("baseBoats:", baseBoats);
      console.log("boatTypes:", boatTypes);
      console.log("docks:", docks);
      console.log("units:", units);
      console.log("vendors:", vendors);

      const boatVOs = baseBoats.map((boat) => {
        const boatType = boatTypes.find((bt) => bt.id === boat.typeId);
        const dock = docks.find((d) => d.id === boat.dockId);
        const unit = units.find((u) => u.id === boat.unitId);
        const vendor = vendors.find((v) => v.id === boat.vendorId);

        console.log(`船只${boat.name}映射结果:`, {
          boat,
          boatType,
          dock,
          unit,
          vendor,
        });

        return {
          boat: boat,
          boatType: boatType || ({} as API.BaseBoatTypesVO),
          dock: dock || ({} as API.BaseDocksVO),
          unit: unit || ({} as API.BaseUnitsVO),
          vendor: vendor || ({} as API.BaseVendorsVO),
        };
      });
      setBoats(boatVOs);
    }
  }, [baseBoats, boatTypes, docks, units, vendors]);

  const handleOpenBoatDialog = useCallback((boat?: API.BaseBoatsVO) => {
    setEditingBoat(boat || null);
    setIsBoatDialogOpen(true);
  }, []);

  // Table columns definition
  const columns: ColumnDef<BoatVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorFn: (row) => row.boat.id,
      enableSorting: true,
    },
    {
      id: "name",
      header: "船名",
      accessorFn: (row) => row.boat.name,
      enableSorting: true,
    },
    {
      id: "typeName",
      header: "船型",
      accessorFn: (row) => row.boatType?.typeName || "-",
      enableSorting: true,
    },
    {
      id: "dockName",
      header: "码头",
      accessorFn: (row) => row.dock?.name || "-",
      enableSorting: true,
    },
    {
      id: "unitName",
      header: "单位",
      accessorFn: (row) => row.unit?.name || "-",
      enableSorting: true,
    },
    {
      id: "vendorName",
      header: "供应商",
      accessorFn: (row) =>
        row.vendor?.userId ? `供应商${row.vendor.userId}` : "-",
      enableSorting: true,
    },
    {
      id: "isEnabled",
      header: "状态",
      cell: ({ row }) => (row.original.boat.isEnabled ? "启用" : "禁用"),
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      cell: ({ row }) =>
        row.original.boat.createdAt
          ? formatDate(row.original.boat.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
    {
      id: "updatedAt",
      header: "更新时间",
      cell: ({ row }) =>
        row.original.boat.updatedAt
          ? formatDate(row.original.boat.updatedAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions
  const actions = [
    {
      label: "编辑",
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: (row: BoatVO) => handleOpenBoatDialog(row.boat),
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加船只",
      icon: <PlusCircle />,
      onClick: () => handleOpenBoatDialog(),
    },
  ];

  return (
    <>
      <BoatDialog
        open={isBoatDialogOpen}
        onOpenChange={(open) => {
          setIsBoatDialogOpen(open);
          if (!open) {
            fetchAllData();
            setEditingBoat(null);
          }
        }}
        boat={editingBoat}
        boatTypes={boatTypes}
        docks={docks}
      />

      <DataTable<BoatVO>
        title="船只管理"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={boats}
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
