export const BOAT_TYPE_CODES = {
  PASSENGER: "PASSENGER",
  CARGO: "CARGO",
  FERRY: "FERRY",
} as const;

export const BOAT_TYPE_NAMES = {
  [BOAT_TYPE_CODES.PASSENGER]: "客船",
  [BOAT_TYPE_CODES.CARGO]: "货船",
  [BOAT_TYPE_CODES.FERRY]: "渡船",
} as const;

export const BOAT_STATUS_CODES = {
  ACTIVE: 0,
  MAINTENANCE: 1,
  INACTIVE: 2,
} as const;

export const BOAT_STATUS_NAMES = {
  [BOAT_STATUS_CODES.ACTIVE]: "正常",
  [BOAT_STATUS_CODES.MAINTENANCE]: "维修中",
  [BOAT_STATUS_CODES.INACTIVE]: "停用",
} as const;


// 状态的描述
export const BOAT_STATUS_DESCRIPTIONS: Record<number, string> = {
  [BOAT_STATUS_CODES.ACTIVE]: "船舶处于正常运行状态，可以接受新的任务",
  [BOAT_STATUS_CODES.MAINTENANCE]: "船舶正在进行维护或修理",
  [BOAT_STATUS_CODES.INACTIVE]: "船舶已停用，暂时不参与任何任务",
};

// 状态的颜色样式
export const BOAT_STATUS_COLORS: Record<number, string> = {
  [BOAT_STATUS_CODES.ACTIVE]: "bg-green-500 hover:bg-green-600",
  [BOAT_STATUS_CODES.MAINTENANCE]: "bg-yellow-500 hover:bg-yellow-600",
  [BOAT_STATUS_CODES.INACTIVE]: "bg-red-500 hover:bg-red-600",
};
