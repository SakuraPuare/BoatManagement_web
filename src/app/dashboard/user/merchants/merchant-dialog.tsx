"use client";
import { z } from "zod";

export const merchantFormSchema = z.object({
  userId: z.number(),
  unitId: z.number(),
  status: z.string(),
});

export function MerchantDialog() {
  return null; // 暂时返回空组件
} 