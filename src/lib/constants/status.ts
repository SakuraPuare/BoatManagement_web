export const STATUS_CODES = {
  ACTIVE: 1,
  INACTIVE: 0,
};

export const STATUS_NAMES = {
  [STATUS_CODES.ACTIVE]: "正常",
  [STATUS_CODES.INACTIVE]: "停用",
};
export const REQUEST_STATUS_MAP: Record<
  string,
  { label: string; color: string }
> = {
  PENDING: { label: "待处理", color: "bg-yellow-100 text-yellow-800" },
  ACCEPTED: { label: "已接受", color: "bg-green-100 text-green-800" },
  REJECTED: { label: "已拒绝", color: "bg-red-100 text-red-800" },
  COMPLETED: { label: "已完成", color: "bg-blue-100 text-blue-800" },
  CANCELLED: { label: "已取消", color: "bg-gray-100 text-gray-800" },
};
//`status` ENUM ('CANCELLED', 'PAID', 'UNPAID', 'ACCEPTED', 'PENDING', 'REFUNDING', 'REFUNDED', 'COMPLETED') NOT NULL DEFAULT 'PENDING' COMMENT '订单状态',
export const ORDER_STATUS = {
  PENDING: { label: "待处理", color: "bg-yellow-100 text-yellow-800" },
  PAID: { label: "已支付", color: "bg-green-100 text-green-800" },
  ACCEPTED: { label: "已接受", color: "bg-blue-100 text-blue-800" },
  COMPLETED: { label: "已完成", color: "bg-blue-100 text-blue-800" },
  CANCELLED: { label: "已取消", color: "bg-red-100 text-red-800" },
  REFUNDING: { label: "退款中", color: "bg-red-100 text-red-800" },
  REFUNDED: { label: "已退款", color: "bg-red-100 text-red-800" },
  UNPAID: { label: "未支付", color: "bg-red-100 text-red-800" },
};
//`status` ENUM ('PENDING', 'ACCEPTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '订单状态',
export const BOAT_ORDER_STATUS_MAP = {
  PENDING: {
    label: "待处理",
    color: "bg-yellow-100 text-yellow-800",
  },
  ACCEPTED: {
    label: "已接受",
    color: "bg-green-100 text-green-800",
  },
  CANCELLED: {
    label: "已取消",
    color: "bg-red-100 text-red-800",
  },
} as const;

//  `type` ENUM ('REAL_TIME', 'RESERVATION') NOT NULL COMMENT '订单类型',
export const BOAT_ORDER_TYPE_MAP = {
  REAL_TIME: { label: "实时请求", color: "bg-blue-100 text-blue-800" },
  RESERVATION: { label: "预约请求", color: "bg-green-100 text-green-800" },
} as const;

//`status` ENUM ('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING' COMMENT '审核状态',
export const MERCHANT_CERTIFY_STATUS_MAP = {
  PENDING: { label: "待处理", color: "bg-yellow-100 text-yellow-800" },
  APPROVED: { label: "已通过", color: "bg-green-100 text-green-800" },
  REJECTED: { label: "已拒绝", color: "bg-red-100 text-red-800" },
} as const;
