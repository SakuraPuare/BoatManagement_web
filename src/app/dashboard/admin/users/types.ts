export interface User {
    createdAt: string;
    updatedAt: string;
    userId: number;
    uuid: string;
    username: string;
    email: string;
    phone: string;
    isActive: boolean;
    isBlocked: boolean;
    role: number;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
  totalRow: number;
} 