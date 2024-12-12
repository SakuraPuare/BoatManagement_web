export type AlertLevel = "info" | "warning" | "error" | "critical";
export type AlertStatus = "active" | "acknowledged" | "resolved";
export type AlertSource = "ship" | "device" | "dock" | "system";

export interface Alert {
  id: string;
  title: string;
  message: string;
  level: AlertLevel;
  status: AlertStatus;
  source: AlertSource;
  sourceId: string;
  sourceName: string;
  timestamp: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
  metadata: {
    [key: string]: string | number | boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  source: AlertSource;
  conditions: {
    metric: string;
    operator: "gt" | "lt" | "eq" | "neq" | "gte" | "lte";
    value: number | string;
    duration?: number; // 持续时间（秒）
  }[];
  level: AlertLevel;
  enabled: boolean;
  notifyChannels: string[]; // 通知渠道（邮件、短信、系统等）
  createdAt: string;
  updatedAt: string;
}
