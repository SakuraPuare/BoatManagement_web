import { RoleMask } from "@/constants/role";

// 角色权限位掩码定义
export const ROLE_BITS = {
  ADMIN: 1,        // 2^0 = 1
  MERCHANT: 2,     // 2^1 = 2  
  VENDOR: 4,       // 2^2 = 4
  BOAT_OWNER: 8,   // 2^3 = 8
  USER: 16,        // 2^4 = 16
} as const;

// 角色名称映射
export const ROLE_NAMES = {
  [ROLE_BITS.ADMIN]: "管理员",
  [ROLE_BITS.MERCHANT]: "商家",
  [ROLE_BITS.VENDOR]: "设备商",
  [ROLE_BITS.BOAT_OWNER]: "船主",
  [ROLE_BITS.USER]: "用户",
} as const;

// 权限列表映射
export const ROLE_PERMISSIONS = {
  [ROLE_BITS.ADMIN]: ["admin", "user", "merchant", "vendor", "boat_owner"],
  [ROLE_BITS.MERCHANT]: ["merchant", "user"],
  [ROLE_BITS.VENDOR]: ["vendor", "user"],
  [ROLE_BITS.BOAT_OWNER]: ["boat_owner", "user"],
  [ROLE_BITS.USER]: ["user"],
} as const;

/**
 * 根据角色掩码获取权限列表
 * @param roleMask 角色掩码
 * @returns 权限列表
 */
export function getRoleList(roleMask: number): string[] {
  const permissions = new Set<string>();
  
  // 检查每个角色位
  Object.entries(ROLE_BITS).forEach(([roleName, roleBit]) => {
    if ((roleMask & roleBit) !== 0) {
      const rolePermissions = ROLE_PERMISSIONS[roleBit as keyof typeof ROLE_PERMISSIONS];
      rolePermissions.forEach(permission => permissions.add(permission));
    }
  });
  
  return Array.from(permissions);
}

/**
 * 检查用户是否有指定角色
 * @param userRole 用户角色掩码
 * @param requiredRoles 需要的角色列表
 * @returns 是否有权限
 */
export function hasRole(userRole: number, requiredRoles: string[]): boolean {
  if (!userRole) return false;
  
  // 管理员拥有所有权限
  if ((userRole & ROLE_BITS.ADMIN) !== 0) return true;
  
  // 检查其他角色权限
  for (const roleCode of requiredRoles) {
    const roleBit = ROLE_BITS[roleCode as keyof typeof ROLE_BITS];
    if (roleBit && (userRole & roleBit) !== 0) {
      return true;
    }
  }
  
  return false;
}

/**
 * 获取用户的角色名称列表
 * @param roleMask 角色掩码
 * @returns 角色名称列表
 */
export function getUserRoleNames(roleMask: number): string[] {
  const roleNames: string[] = [];
  
  Object.entries(ROLE_BITS).forEach(([roleName, roleBit]) => {
    if ((roleMask & roleBit) !== 0) {
      roleNames.push(ROLE_NAMES[roleBit as keyof typeof ROLE_NAMES]);
    }
  });
  
  return roleNames;
}

/**
 * 检查用户是否有指定权限
 * @param userRole 用户角色掩码
 * @param permission 权限名称
 * @returns 是否有权限
 */
export function hasPermission(userRole: number, permission: string): boolean {
  const userPermissions = getRoleList(userRole);
  return userPermissions.includes(permission);
}
