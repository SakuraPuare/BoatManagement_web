import {components} from "@/api/api";

export type OrderStatus =
    | "pending"
    | "paid"
    | "completed"
    | "cancelled"
    | "refunded";
export type PaymentMethod = "alipay" | "wechat" | "creditcard" | "other";

export type Order = components["schemas"]["Orders"];
