"use client";
import React from "react";

import { DialogForm, FieldConfig } from "@/components/data-form";
import { userCreateBoatRequest } from "@/services/api/userBoatRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const requestFormSchema = z.object({
  startDockId: z.number().min(1, "请选择起始码头"),
  endDockId: z.number().min(1, "请选择目的码头"),
  startTime: z.date(),
  endTime: z.date(),
  type: z.enum(["REAL_TIME", "RESERVATION"], {
    required_error: "请选择请求类型",
  }),
});

type FormValues = z.infer<typeof requestFormSchema>;

interface RequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  docks: API.BaseDocksVO[];
  onSuccess?: () => void;
}

export function RequestDialog({
  open,
  onOpenChange,
  docks,
  onSuccess,
}: RequestDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      startDockId: 0,
      endDockId: 0,
      startTime: new Date(),
      endTime: new Date(),
      type: "REAL_TIME",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await userCreateBoatRequest({
        ...values,
        startTime: format(values.startTime, "yyyy-MM-dd'T'HH:mm:ss"),
        endTime: format(values.endTime, "yyyy-MM-dd'T'HH:mm:ss"),
      });
      if (res.data) {
        toast.success("创建请求成功");
        onOpenChange(false);
        form.reset();
        onSuccess?.();
      } else {
        toast.error("创建请求失败");
      }
    } catch (error) {
      console.error("创建请求失败:", error);
      toast.error(
        "创建请求失败: " + (error instanceof Error ? error.message : "未知错误")
      );
    }
  };

  // 字段配置
  const fieldConfigs: Record<keyof FormValues, FieldConfig> = {
    startDockId: {
      type: "select",
      label: "起始码头",
      placeholder: "选择起始码头",
      options: docks.map((dock) => ({
        value: dock.id?.toString() || "",
        label: dock.name || "",
      })),
    },
    endDockId: {
      type: "select",
      label: "目的码头",
      placeholder: "选择目的码头",
      options: docks.map((dock) => ({
        value: dock.id?.toString() || "",
        label: dock.name || "",
      })),
    },
    startTime: {
      type: "date",
      label: "开始时间",
      placeholder: "选择开始时间",
    },
    endTime: {
      type: "date",
      label: "结束时间",
      placeholder: "选择结束时间",
    },
    type: {
      type: "select",
      label: "请求类型",
      placeholder: "选择请求类型",
      options: [
        { value: "REAL_TIME", label: "实时请求" },
        { value: "RESERVATION", label: "预约请求" },
      ],
    },
  };

  // 默认表单值
  const defaultValues: FormValues = {
    startDockId: 0,
    endDockId: 0,
    startTime: new Date(),
    endTime: new Date(),
    type: "REAL_TIME",
  };

  return (
    <DialogForm
      title="新建船只请求"
      description="请填写船只请求信息"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      formSchema={requestFormSchema}
      defaultValues={defaultValues}
      fieldConfigs={fieldConfigs}
      formMethods={form}
      submitButtonText={form.formState.isSubmitting ? "提交中..." : "创建"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["startDockId", "endDockId", "startTime", "endTime", "type"]}
      key="new"
    />
  );
}
