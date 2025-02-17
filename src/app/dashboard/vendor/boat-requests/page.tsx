"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Ship } from "lucide-react";
import type { API } from "@/services/api/typings";
import { DataPagination } from "@/components/ui/data-pagination";
import { getVendorBoatRequestsPageQuery } from "@/services/api/vendorBoatRequest";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { REQUEST_STATUS_MAP } from "@/lib/constants/status";
import { getDocksById } from "@/services/api/adminDock";
const ITEMS_PER_PAGE = 10;

export default function VendorBoatRequestsPage() {
  const [requests, setRequests] = useState<API.BaseBoatRequestsVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dockNames, setDockNames] = useState<Record<number, string>>({});

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const [requestsResponse] = await Promise.all([
        getVendorBoatRequestsPageQuery(
          { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
          {}
        ),
      ]);
      setRequests(requestsResponse.data?.data?.records || []);
      setTotalPages(requestsResponse.data?.data?.totalPage || 0);

      // 获取所有请求中涉及的码头ID
      const dockIds = new Set<number>();
      requestsResponse.data?.data?.records?.forEach((request) => {
        if (request.startDockId) dockIds.add(request.startDockId);
        if (request.endDockId) dockIds.add(request.endDockId);
      });

      // 获取所有码头的名称
      const dockNamesMap: Record<number, string> = {};
      await Promise.all(
        Array.from(dockIds).map(async (id) => {
          try {
            const response = await getDocksById({ id }, {});
            if (response.data?.data?.name) {
              dockNamesMap[id] = response.data.data.name;
            }
          } catch (error) {
            console.error(`Failed to fetch dock name for ID ${id}:`, error);
          }
        })
      );
      setDockNames(dockNamesMap);
    } catch (error) {
      console.error(error);
      toast.error("获取数据失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Ship className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">船只请求</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索请求..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>请求ID</TableHead> 
              <TableHead>起始码头</TableHead>
              <TableHead>目的码头</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>
                    {dockNames[request.startDockId || 0] || "未知码头"}
                  </TableCell>
                  <TableCell>
                    {dockNames[request.endDockId || 0] || "未知码头"}
                  </TableCell>
                  <TableCell>
                    {request.startTime &&
                      format(
                        new Date(request.startTime),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                  </TableCell>
                  <TableCell>
                    {request.endTime &&
                      format(new Date(request.endTime), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        REQUEST_STATUS_MAP[request?.status as string]?.color
                      }
                    >
                      {REQUEST_STATUS_MAP[request?.status as string]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.createdAt &&
                      format(
                        new Date(request.createdAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                  </TableCell>
                  <TableCell>
                    {request.updatedAt &&
                      format(
                        new Date(request.updatedAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={requests.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
