import {STATUS_CODES} from "@/lib/constants/status";

export type Status = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
