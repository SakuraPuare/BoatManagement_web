export const ROLE_MASKS = {
    USER: 1, // 0001
    MERCHANT: 1 << 1, // 0010
    VENDOR: 1 << 2, // 0100
    ADMIN: 16777215, // 1000
} as const;

export const ROLE_CHINESE_NAMES = {
    [ROLE_MASKS.USER]: "用户",
    [ROLE_MASKS.MERCHANT]: "商家",
    [ROLE_MASKS.VENDOR]: "供应商",
    [ROLE_MASKS.ADMIN]: "管理员",
} as const;

export const ROLE_ENGLISH_NAMES = {
    [ROLE_MASKS.USER]: "user",
    [ROLE_MASKS.MERCHANT]: "merchant",
    [ROLE_MASKS.VENDOR]: "vendor",
    [ROLE_MASKS.ADMIN]: "admin",
} as const;
export const ROLE_COLORS = {
    [ROLE_MASKS.USER]: "bg-blue-100 text-blue-800",
    [ROLE_MASKS.MERCHANT]: "bg-green-100 text-green-800",
    [ROLE_MASKS.VENDOR]: "bg-purple-100 text-purple-800",
    [ROLE_MASKS.ADMIN]: "bg-red-100 text-red-800",
} as const;

export const ROLE_DESCRIPTIONS: Record<number, string> = {
    [ROLE_MASKS.USER]: "普通用户权限，可以访问基本功能",
    [ROLE_MASKS.MERCHANT]: "商家权限，可以管理自己的店铺和商品",
    [ROLE_MASKS.VENDOR]: "供应商权限，可以管理自己的商品和订单",
    [ROLE_MASKS.ADMIN]: "管理员权限，可以管理用户和系统设置",
};

export function getRoleChineseNames(roleMask: number): string[] {
    return Object.entries(ROLE_MASKS)
        .filter(([_, mask]) => roleMask & mask)
        .map(([_, mask]) => ROLE_CHINESE_NAMES[mask]);
}

export function getRoleEnglishNames(roleMask: number): string[] {
    return Object.entries(ROLE_MASKS)
        .filter(([_, mask]) => roleMask & mask)
        .map(([_, mask]) => ROLE_ENGLISH_NAMES[mask]);
}

export function getRoleColors(roleMask: number): string[] {
    return Object.entries(ROLE_MASKS)
        .filter(([_, mask]) => roleMask & mask)
        .map(([_, mask]) => ROLE_COLORS[mask]);
}
