import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

"use client";

interface DataPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    showItemCount?: boolean;
}

export function DataPagination({
                                   currentPage,
                                   totalPages,
                                   totalItems,
                                   onPageChange,
                                   showItemCount = true,
                               }: DataPaginationProps) {
    return (
        <div className="flex items-center justify-between">
            {showItemCount && (
                <div className="text-sm text-gray-500">共 {totalItems} 条记录</div>
            )}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                        let pageNumber: number;
                        if (totalPages <= 5) {
                            pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                        } else {
                            pageNumber = currentPage - 2 + i;
                        }

                        if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        onClick={() => onPageChange(pageNumber)}
                                        isActive={currentPage === pageNumber}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }

                        if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                        ) {
                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            );
                        }

                        return null;
                    })}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                onPageChange(Math.min(currentPage + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
