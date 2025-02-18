"use client";
import {
  Action,
  Column,
  DataManagementTable,
} from "@/components/data-management-table";
import { getAdminUnitListQuery } from "@/services/api/adminUnit";
import { getAdminBoatPageQuery } from "@/services/api/adminBoat";
import { getAdminBoatTypeListQuery } from "@/services/api/adminBoatType";
import { getAdminDocksListQuery } from "@/services/api/adminDock";
import { API } from "@/services/api/typings";
import { Pencil, Ship } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { BoatDialog } from "./boat-dialog";
import { boatFormSchema } from "./boat-dialog";

type BoatVO = {
  boat: API.BaseBoatsVO;
  boatType: API.BaseBoatTypesVO;
  dock: API.BaseDocksVO;
  // vendor: API.BaseVendorsVO;
  unit: API.BaseUnitsVO;
};

export default function BoatsPage() {
  const [boats, setBoats] = useState<BoatVO[]>([]);
  const [baseBoats, setBaseBoats] = useState<API.BaseBoatsVO[]>([]);
  const [boatTypes, setBoatTypes] = useState<API.BaseBoatTypesVO[]>([]);
  // const [vendors, setVendors] = useState<API.BaseVendorsVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  const [selectedBoat, setSelectedBoat] = useState<BoatVO | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBoats = useCallback(async () => {
    try {
      const response = await getAdminBoatPageQuery(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );
      console.log(response.data?.data?.records);
      setBaseBoats(response.data?.data?.records || []);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, statusFilter]);

  const fetchBoatTypes = useCallback(async () => {
    try {
      const response = await getAdminBoatTypeListQuery({});
      setBoatTypes(response.data?.data || []);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchDocks = useCallback(async () => {
    try {
      const response = await getAdminDocksListQuery({});
      setDocks(response.data?.data || []);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const fetchVendors = useCallback(async () => {
  //   try {
  //     const response = await getAdminVendorListQuery({});
  //     setVendors(response.data?.data || []);
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const fetchUnits = useCallback(async () => {
    try {
      const response = await getAdminUnitListQuery({},{});
      setUnits(response.data?.data || []);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    await fetchBoatTypes();
    await fetchDocks();
    await fetchUnits();
    await fetchBoats();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (
      baseBoats.length !== 0 &&
      boatTypes.length !== 0 &&
      docks.length !== 0 &&
      units.length !== 0
    ) {
      const boats = baseBoats.map((boat) => {
        const boatType = boatTypes.find((bt) => bt.id === boat.typeId);
        const dock = docks.find((d) => d.id === boat.dockId);
        // const vendor = vendors.find((v) => v.id === boat.vendorId);
        const unit = units.find((u) => u.id === boat.unitId);
        return {
          boat: boat,
          boatType: boatType!,
          dock: dock!,
          // vendor: vendor!,
          unit: unit!,
        };
      });
      setBoats(boats);
      setIsLoading(false);
    }
  }, [baseBoats, boatTypes, docks]);
  const handleEdit = (boat: BoatVO) => {
    setSelectedBoat(boat);
    setIsDialogOpen(true);
  };

  const columns: Column<BoatVO>[] = [
    { header: "ID", accessor: "boat.id" },
    { header: "船名", accessor: "boat.name" },
    { header: "船型", accessor: "boatType.typeName" },
    { header: "船长", accessor: "boatType.length" },
    { header: "船宽", accessor: "boatType.width" },
    { header: "载重", accessor: "boatType.maxLoad" },
    { header: "核载人数", accessor: "boatType.grossNumber" },
    { header: "码头", accessor: "dock.name" },
    { header: "单位", accessor: "unit.name" },
    { header: "创建时间", accessor: "boat.createdAt" },
    { header: "更新时间", accessor: "boat.updatedAt" },
  ];

  const actions: Action<BoatVO>[] = [
    {
      icon: <Pencil className="h-4 w-4 mr-2" />,
      label: "编辑",
      onClick: handleEdit,
    },
  ];

  return (
    <>
      <DataManagementTable
        title="船只管理"
        icon={<Ship className="h-6 w-6" />}
        data={boats}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索船名、船型或码头..."
        dialog={BoatDialog}
        schema={boatFormSchema}
        queryFn={async ({ pageNum, pageSize }, searchQuery) => {
          const response = await getAdminBoatPageQuery(
            { pageNum, pageSize },
            { name: searchQuery } as API.BaseBoatsDTO
          );
          const records = response.data?.data?.records || [];
          const boatVOs = records.map(boat => ({
            boat,
            boatType: boatTypes.find(bt => bt.id === boat.typeId)!,
            dock: docks.find(d => d.id === boat.dockId)!,
            unit: units.find(u => u.id === boat.unitId)!
          }));
          return {
            list: boatVOs,
            totalItems: records.length,
            totalPages: response.data?.data?.totalPage || 0,
          };
        }}
        statusFilter={{
          value: statusFilter,
          onChange: setStatusFilter,
          options: [],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: boats.length,
          onPageChange: setCurrentPage,
        }}
      />

      <BoatDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            fetchAllData();
            setSelectedBoat(null);
          }
        }}
        boat={selectedBoat?.boat || null}
        boatTypes={boatTypes}
        docks={docks}
      />
    </>
  );
}
