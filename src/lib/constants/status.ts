// 船只订单状态映射
export const BOAT_ORDER_STATUS_MAP = {
  PENDING: {
    label: "待处理",
    color: "bg-yellow-100 text-yellow-800"
  },
  CONFIRMED: {
    label: "已确认",
    color: "bg-blue-100 text-blue-800"
  },
  IN_PROGRESS: {
    label: "进行中",
    color: "bg-green-100 text-green-800"
  },
  COMPLETED: {
    label: "已完成",
    color: "bg-gray-100 text-gray-800"
  },
  CANCELLED: {
    label: "已取消",
    color: "bg-red-100 text-red-800"
  },
  REJECTED: {
    label: "已拒绝",
    color: "bg-red-100 text-red-800"
  }
} as const;

// 船只订单类型映射
export const BOAT_ORDER_TYPE_MAP = {
  REAL_TIME: {
    label: "实时请求",
    color: "bg-green-100 text-green-800"
  },
  RESERVATION: {
    label: "预约请求",
    color: "bg-blue-100 text-blue-800"
  }
} as const;

// 通用订单状态映射（用于商品订单等）
export const ORDER_STATUS = {
  PENDING: {
    label: "待处理",
    color: "bg-yellow-100 text-yellow-800"
  },
  CONFIRMED: {
    label: "已确认", 
    color: "bg-blue-100 text-blue-800"
  },
  PAID: {
    label: "已支付",
    color: "bg-green-100 text-green-800"
  },
  SHIPPED: {
    label: "已发货",
    color: "bg-purple-100 text-purple-800"
  },
  DELIVERED: {
    label: "已送达",
    color: "bg-green-100 text-green-800"
  },
  COMPLETED: {
    label: "已完成",
    color: "bg-gray-100 text-gray-800"
  },
  CANCELLED: {
    label: "已取消",
    color: "bg-red-100 text-red-800"
  },
  REFUNDED: {
    label: "已退款",
    color: "bg-orange-100 text-orange-800"
  }
} as const;

// 订单状态类型
export type BoatOrderStatus = keyof typeof BOAT_ORDER_STATUS_MAP;

// 订单类型
export type BoatOrderType = keyof typeof BOAT_ORDER_TYPE_MAP;

// 商户认证状态映射
export const MERCHANT_CERTIFY_STATUS_MAP = {
  PENDING: {
    label: "待审核",
    color: "bg-yellow-100 text-yellow-800"
  },
  APPROVED: {
    label: "已通过",
    color: "bg-green-100 text-green-800"
  },
  REJECTED: {
    label: "已拒绝",
    color: "bg-red-100 text-red-800"
  },
  SUSPENDED: {
    label: "已暂停",
    color: "bg-gray-100 text-gray-800"
  }
} as const;

// 请求状态映射
export const REQUEST_STATUS_MAP = {
  PENDING: {
    label: "待处理",
    color: "bg-yellow-100 text-yellow-800"
  },
  APPROVED: {
    label: "已批准",
    color: "bg-green-100 text-green-800"
  },
  REJECTED: {
    label: "已拒绝",
    color: "bg-red-100 text-red-800"
  },
  IN_PROGRESS: {
    label: "进行中",
    color: "bg-blue-100 text-blue-800"
  },
  COMPLETED: {
    label: "已完成",
    color: "bg-gray-100 text-gray-800"
  },
  CANCELLED: {
    label: "已取消",
    color: "bg-red-100 text-red-800"
  }
} as const;

// 通用订单状态类型
export type OrderStatus = keyof typeof ORDER_STATUS;

// 商户认证状态类型
export type MerchantCertifyStatus = keyof typeof MERCHANT_CERTIFY_STATUS_MAP;

// 请求状态类型
export type RequestStatus = keyof typeof REQUEST_STATUS_MAP;

// 供应商状态映射
export const VENDOR_STATUS_MAP = {
  ACTIVE: {
    label: "活跃",
    variant: "default" as const,
  },
  INACTIVE: {
    label: "非活跃",
    variant: "secondary" as const,
  },
  SUSPENDED: {
    label: "已暂停",
    variant: "destructive" as const,
  },
  PENDING: {
    label: "待审核",
    variant: "outline" as const,
  }
} as const;

// 供应商状态类型
export type VendorStatus = keyof typeof VENDOR_STATUS_MAP; 