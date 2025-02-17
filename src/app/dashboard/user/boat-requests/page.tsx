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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Anchor, MoreVertical, Plus, Search, X } from "lucide-react";
import type { API } from "@/services/api/typings";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  cancelUserBoatRequest,
  getUserBoatRequestsPageQuery,
} from "@/services/api/userBoatRequest";
import { toast } from "sonner";
import { RequestDialog } from "./request-dialog";
import { getUserDockListQuery } from "@/services/api/userDockController";

const ITEMS_PER_PAGE = 10;

export default function BoatRequestsPage() {
  const [requests, setRequests] = useState<API.BaseBoatRequestsVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const [requestsResponse] = await Promise.all([
        getUserBoatRequestsPageQuery(
          { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
          {}
        ),
      ]);
      fetchDocks();
      console.log(requestsResponse.data?.data?.records);
      setRequests(requestsResponse.data?.data?.records || []);
      setTotalPages(requestsResponse.data?.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
      toast.error("获取数据失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);
  const fetchDocks = useCallback(async () => {
    try {
      const docksResponse = await getUserDockListQuery(
        {},
        {
          isEnabled: true,
        }
      );
      setDocks(docksResponse.data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error("获取码头列表失败");
    }
  }, []);
  const handleCancel = async (id: number) => {
    try {
      await cancelUserBoatRequest({ id });
      toast.success("取消请求成功");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("取消请求失败");
    }
  };

  const handleCreate = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">船只请求</h1>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          新建请求
        </Button>
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
              <TableHead>类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.startDockId}</TableCell>
                  <TableCell>{request.endDockId}</TableCell>
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
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : request.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.status}
                    </span>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleCancel(request.id!)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4 mr-2" />
                          取消请求
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      <RequestDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchRequests();
          }
          setIsDialogOpen(open);
        }}
        docks={docks}
      />
    </div>
  );
}
