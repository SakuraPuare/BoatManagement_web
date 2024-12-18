import { STATUS_CODES } from "@/lib/constants/status";
import { components } from "@/api/api";

export type DockStatus = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

export type Dock = components["schemas"]["Docks"];
