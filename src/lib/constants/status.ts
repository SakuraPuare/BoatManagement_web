export const STATUS_CODES = {
    ACTIVE: 1,
    INACTIVE: 0,
};

export const STATUS_NAMES = {
    [STATUS_CODES.ACTIVE]: "正常",
    [STATUS_CODES.INACTIVE]: "停用",
};
export const REQUEST_STATUS_MAP: Record<string, { label: string; color: string }> = {
    "PENDING": { label: "待处理", color: "bg-yellow-100 text-yellow-800" },
    "ACCEPTED": { label: "已接受", color: "bg-green-100 text-green-800" },
    "REJECTED": { label: "已拒绝", color: "bg-red-100 text-red-800" },
    "COMPLETED": { label: "已完成", color: "bg-blue-100 text-blue-800" },
    "CANCELLED": { label: "已取消", color: "bg-gray-100 text-gray-800" },
  };