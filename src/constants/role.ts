export const RoleMask: Record<RoleType, number> = {
  USER: 1 << 0,
  MERCHANT: 1 << 1,
  VENDOR: 1 << 2,
  ADMIN: 1 << 3,
} as const;

export const RoleChineseName: Record<RoleType, string> = {
  USER: "用户",
  MERCHANT: "商户",
  VENDOR: "供应商",
  ADMIN: "管理员",
} as const;

export const RoleEnglishName: Record<RoleType, string> = {
  USER: "user",
  MERCHANT: "merchant",
  VENDOR: "vendor",
  ADMIN: "admin",
} as const;

export const RoleColor: Record<RoleType, string> = {
  USER: "bg-gray-500",
  MERCHANT: "bg-blue-500",
  VENDOR: "bg-green-500",
  ADMIN: "bg-red-500",
} as const;
