export type LogLevel = "debug" | "info" | "warning" | "error";
export type LogModule =
  | "system"
  | "user"
  | "ship"
  | "device"
  | "dock"
  | "order"
  | "ticket";
export type LogAction =
  | "create"
  | "update"
  | "delete"
  | "login"
  | "logout"
  | "other";

export interface Log {
  id: string;
  timestamp: string;
  level: LogLevel;
  module: LogModule;
  action: LogAction;
  message: string;
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  targetId?: string;
  targetType?: string;
  metadata: {
    [key: string]: string | number | boolean;
  };
  stackTrace?: string;
  duration?: number; // 操作耗时（毫秒）
  status: "success" | "failure";
  createdAt: string;
}

export interface LogStats {
  totalCount: number;
  errorCount: number;
  warningCount: number;
  moduleStats: {
    [key in LogModule]: number;
  };
  actionStats: {
    [key in LogAction]: number;
  };
  hourlyStats: {
    hour: number;
    count: number;
  }[];
}
