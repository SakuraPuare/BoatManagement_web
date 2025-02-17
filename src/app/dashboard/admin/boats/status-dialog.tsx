"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  BOAT_STATUS_CODES,
  BOAT_STATUS_COLORS,
  BOAT_STATUS_DESCRIPTIONS,
  BOAT_STATUS_NAMES,
} from "@/lib/constants/boat-type";
import { cn } from "@/lib/utils";
import { update3 } from "@/services/api/adminBoat";
import type { API } from "@/services/api/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const StatusFormSchema = z.object({
  status: z.number(),
});

type FormValues = z.infer<typeof StatusFormSchema>;

interface BoatStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO;
}

export function BoatStatusDialog({
  open,
  onOpenChange,
  boat,
}: BoatStatusDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(StatusFormSchema),
    defaultValues: {
      status: boat?.status?.toString() || BOAT_STATUS_CODES.ACTIVE.toString(),
    },
    values: {
      status: boat?.status?.toString() || BOAT_STATUS_CODES.ACTIVE.toString(),
    },
  });

  const status = form.watch("status");

  const setStatus = (statusValue: number) => {
    form.setValue("status", statusValue, { shouldValidate: true });
  };

  const hasStatus = (statusValue: number) => {
    return status === statusValue;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (!boat?.id) {
        throw new Error("船只ID不存在");
      }
      await update3({ id: boat.id }, { status: values.status.toString() });
      onOpenChange(false);
    } catch (error) {
      console.error("更新状态失败:", error);
      toast.error(
        "更新状态失败: " +
          (error instanceof Error ? error.message : "未知错误"),
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader>
          <AlertDialogTitle>状态设置 - {boat?.name}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={() => (
                <FormItem>
                  <FormLabel>船舶状态</FormLabel>
                  <FormDescription>
                    选择船舶当前的运行状态。一个船舶同一时间只能处于一种状态。
                  </FormDescription>
                  <div className="space-y-4">
                    {Object.entries(BOAT_STATUS_CODES).map(
                      ([statusName, statusValue]) => (
                        <div
                          key={statusValue}
                          className="flex items-start space-x-4"
                        >
                          <Button
                            type="button"
                            variant={
                              hasStatus(statusValue) ? "default" : "outline"
                            }
                            onClick={() => setStatus(statusValue)}
                            className={cn(
                              "min-w-[100px]",
                              hasStatus(statusValue) &&
                                BOAT_STATUS_COLORS[statusValue],
                            )}
                          >
                            {BOAT_STATUS_NAMES[statusValue]}
                          </Button>
                          <FormDescription className="mt-2">
                            {BOAT_STATUS_DESCRIPTIONS[statusValue]}
                          </FormDescription>
                        </div>
                      ),
                    )}
                  </div>
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                取消
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting ? "更新中..." : "更新状态"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
