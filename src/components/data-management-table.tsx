import { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Plus, Search } from "lucide-react";
import { DataPagination } from "@/components/ui/data-pagination";

export interface Column<T> {
    header: string;
    accessor: keyof T;
    render?: (value: any, item: T) => ReactNode;
}

export interface Action<T> {
    icon: ReactNode;
    label: string | ((item: T) => string);
    onClick: (item: T) => void;
}

interface StatusFilterOption {
    value: string;
    label: string;
}

interface DataManagementTableProps<T> {
    title: string;
    icon: ReactNode;
    data: T[];
    isLoading: boolean;
    columns: Column<T>[];
    actions: Action<T>[];
    searchPlaceholder: string;
    statusFilter: {
        value: string;
        onChange: (value: string) => void;
        options: StatusFilterOption[];
    };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        onPageChange: (page: number) => void;
    };
    onAdd?: () => void;
}

export function DataManagementTable<T>({
    title,
    icon,
    data,
    isLoading,
    columns,
    actions,
    searchPlaceholder,
    statusFilter,
    pagination,
    onAdd,
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
                    />
                </div>
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
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={String(column.accessor)}>{column.header}</TableHead>
                            ))}
                            <TableHead className="w-[100px]">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="text-center py-10">
                                    加载中...
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="text-center py-10">
                                    暂无数据
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={String(column.accessor)}>
                                            {column.render
                                                ? column.render(item[column.accessor], item)
                                                : String(item[column.accessor])}
                                        </TableCell>
                                    ))}
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
                                                        {typeof action.label === 'function' ? action.label(item) : action.label}
                                                    </DropdownMenuItem>
                                                ))}
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
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                onPageChange={pagination.onPageChange}
            />
        </div>
    );
}