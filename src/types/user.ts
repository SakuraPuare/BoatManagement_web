export interface User {
  id: string;
  email: string;
  role: "admin" | "merchant";
  name: string;
}

export interface UserSelf {
  uuid: string;
  userId: number;
  username: string;
  email: string;
  phone: string;
  role: number;
  isActive: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  userId: number;
  username: string;
  email: string;
  phone: string;
  role: number;
  isActive: boolean;
  isBlocked: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserPageResponse {
  records: UserSelf[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}
