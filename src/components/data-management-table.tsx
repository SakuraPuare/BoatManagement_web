import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NestedKeyOf, NestedValue } from "@/types/commom";
import { MoreVertical, Plus, Search } from "lucide-react";
import React, { ReactNode } from "react";
import { z } from "zod";

function getValue<T, K extends NestedKeyOf<T>>(
  obj: T,
  path: K
): NestedValue<T, K> {
  const [first, second] = path.split(".") as [keyof T & string, string];

  if (second === undefined) {
    return obj[first] as NestedValue<T, K>;
  }

  const firstValue = obj[first];
  if (firstValue && typeof firstValue === "object") {
    return firstValue[second as keyof typeof firstValue] as NestedValue<T, K>;
  }

  return undefined as NestedValue<T, K>;
}
export interface TableRow<T> {
  id?: number;
  data: T;
  handleEdit?: (item: T) => void;
  handleDelete?: (id: number) => void;
}
export interface Column<T> {
  header: string;
  accessor: NestedKeyOf<T>;
  render?: (value: any, row?: TableRow<T>) => ReactNode;
}

export interface Action<T> {
  icon: ReactNode;
  label: string | ((item: T) => string);
  onClick: (item: T) => void;
}

export interface StatusFilterOption {
  value: string;
  label: string;
}

export interface DataManagementTableProps<T> {
  title: string;
  icon: ReactNode;
  columns: Column<T>[];
  searchPlaceholder?: string;
  dialog?: React.ComponentType<any>;
  schema?: z.ZodSchema<any>;
  queryFn: (params: { pageNum: number; pageSize: number }, searchQuery: string) => Promise<{
    list: T[];
    totalItems: number;
    totalPages: number;
  }>;
  addFn?: (data: any) => Promise<void>;
  updateFn?: (id: number, data: any) => Promise<void>;
  deleteFn?: (id: number) => Promise<void>;
  deleteConfirmMessage?: string;
  addSuccessMessage?: string;
  updateSuccessMessage?: string;
  deleteSuccessMessage?: string;
  queryErrorMessage?: string;
  addErrorMessage?: string;
  updateErrorMessage?: string;
  deleteErrorMessage?: string;
  data?: T[];
  isLoading?: boolean;
  actions?: Action<T>[];
  statusFilter?: {
    value: string;
    onChange: (value: string) => void;
    options: StatusFilterOption[];
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
  onAdd?: () => void;
  onSearch?: (value: string) => void;
}

export function DataManagementTable<T>({
  title,
  icon,
  data = [],
  isLoading = false,
  columns,
  actions = [],
  searchPlaceholder,
  statusFilter,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    onPageChange: () => {},
  },
  onAdd,
  onSearch,
}: DataManagementTableProps<T>) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        {onAdd && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            添加
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        {statusFilter && (
          <Select
            value={statusFilter.value}
            onValueChange={statusFilter.onChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              {statusFilter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.accessor)}>
                  {column.header}
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-[100px]">操作</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-10"
                >
                  加载中...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-10"
                >
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.accessor)}>
                      {column.render
                        ? column.render(getValue(item, column.accessor), { data: item })
                        : String(getValue(item, column.accessor))}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions.map((action, actionIndex) => (
                            <DropdownMenuItem
                              key={actionIndex}
                              onClick={() => action.onClick(item)}
                            >
                              {action.icon}
                              {typeof action.label === "function"
                                ? action.label(item)
                                : action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPageChange={pagination.onPageChange}
      />
    </div>
  );
}
