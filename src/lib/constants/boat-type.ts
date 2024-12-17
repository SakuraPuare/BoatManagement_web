
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
