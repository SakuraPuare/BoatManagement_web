export const ROLE_MASKS = {
    USER: 1 << 0,      // 1
    MERCHANT: 1 << 1,  // 2
    VENDOR: 1 << 2,    // 4
    ADMIN: 1 << 3,     // 8
  } as const;
  
  export const ROLE_CHINESE_NAMES: Record<number, string> = {
    [ROLE_MASKS.USER]: "用户",
    [ROLE_MASKS.MERCHANT]: "商户", 
    [ROLE_MASKS.VENDOR]: "供应商",
    [ROLE_MASKS.ADMIN]: "管理员",
  };
  
  export const ROLE_COLORS: Record<number, string> = {
  [ROLE_MASKS.USER]: "bg-gray-100 text-gray-800",
  [ROLE_MASKS.MERCHANT]: "bg-blue-100 text-blue-800",
  [ROLE_MASKS.VENDOR]: "bg-green-100 text-green-800", 
  [ROLE_MASKS.ADMIN]: "bg-red-100 text-red-800",
};

export const ROLE_DESCRIPTIONS: Record<number, string> = {
  [ROLE_MASKS.USER]: "普通用户，可以浏览和预订船舶服务",
  [ROLE_MASKS.MERCHANT]: "商户，可以管理商品和订单",
  [ROLE_MASKS.VENDOR]: "供应商，可以管理船舶和船舶类型",
  [ROLE_MASKS.ADMIN]: "管理员，拥有系统的完全访问权限",
};
  
  export function getRoleChineseNames(roleMask: number): string[] {
    const names: string[] = [];
    Object.entries(ROLE_MASKS).forEach(([key, mask]) => {
      if (roleMask & mask) {
        names.push(ROLE_CHINESE_NAMES[mask]);
      }
    });
    return names;
  }
  
  export function getRoleColors(roleMask: number): string[] {
    const colors: string[] = [];
    Object.entries(ROLE_MASKS).forEach(([key, mask]) => {
      if (roleMask & mask) {
        colors.push(ROLE_COLORS[mask]);
      }
    });
    return colors;
  }