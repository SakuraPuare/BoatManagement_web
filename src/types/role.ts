export const UserRole = {
  USER: 1,
  MERCHANT: (1 << 1) | 1,
  VENDOR: (1 << 2) | 1,
  ADMIN: 1 | (1 << 1) | (1 << 2),
  SUPER_ADMIN: 1 << 5,
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  roles: number;
  name: string;
  email: string;
}
