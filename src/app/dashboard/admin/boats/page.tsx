"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { adminGetUnitList } from "@/services/api/adminUnit";
import { adminGetBoatPage } from "@/services/api/adminBoat";
import { adminGetBoatTypeList } from "@/services/api/adminBoatType";
import { adminGetDockList } from "@/services/api/adminDock";
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
      setPage({
        pageNumber: responseData?.pageNum || 1,
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
      setBoatTypes(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch boat types:", error);
      toast.error("获取船只类型失败");
    }
  }, []);

  const fetchDocks = useCallback(async () => {
    try {
      const response = await adminGetDockList({}, {});
      setDocks(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch docks:", error);
      toast.error("获取码头列表失败");
    }
  }, []);

  const fetchUnits = useCallback(async () => {
    try {
      const response = await adminGetUnitList({}, {});
      setUnits(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch units:", error);
      toast.error("获取单位列表失败");
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchBoatTypes(),
      fetchDocks(),
      fetchUnits(),
      fetchBoats(),
    ]);
  }, [fetchBoatTypes, fetchDocks, fetchUnits, fetchBoats]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (
      baseBoats.length !== 0 &&
      boatTypes.length !== 0 &&
      docks.length !== 0 &&
      units.length !== 0
    ) {
      const boatVOs = baseBoats.map((boat) => {
        const boatType = boatTypes.find((bt) => bt.id === boat.typeId);
        const dock = docks.find((d) => d.id === boat.dockId);
        const unit = units.find((u) => u.id === boat.unitId);
        return {
          boat: boat,
          boatType: boatType!,
          dock: dock!,
          unit: unit!,
        };
      });
      setBoats(boatVOs);
    }
  }, [baseBoats, boatTypes, docks, units]);

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
      accessorFn: (row) => row.boatType?.typeName,
      enableSorting: true,
    },
    {
      id: "length",
      header: "船长(m)",
      accessorFn: (row) => row.boatType?.length,
      enableSorting: true,
    },
    {
      id: "width",
      header: "船宽(m)",
      accessorFn: (row) => row.boatType?.width,
      enableSorting: true,
    },
    {
      id: "maxLoad",
      header: "载重(吨)",
      accessorFn: (row) => row.boatType?.maxLoad,
      enableSorting: true,
    },
    {
      id: "grossNumber",
      header: "核载人数",
      accessorFn: (row) => row.boatType?.grossNumber,
      enableSorting: true,
    },
    {
      id: "dockName",
      header: "码头",
      accessorFn: (row) => row.dock?.name,
      enableSorting: true,
    },
    {
      id: "unitName",
      header: "单位",
      accessorFn: (row) => row.unit?.name,
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
