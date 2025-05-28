"use client";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { toast } from "sonner";
import { createBoatType, updateBoatType } from "@/services/api/vendorBoatType";

const boatTypeFormSchema = z.object({
  typeName: z.string().min(1, "请输入类型名称"),
  description: z.string().min(1, "请输入描述"),
  length: z.coerce.number().min(0, "长度不能小于0"),
  width: z.coerce.number().min(0, "宽度不能小于0"),
  grossNumber: z.coerce.number().min(0, "总吨位不能小于0"),
  maxLoad: z.coerce.number().min(0, "最大载重不能小于0"),
  maxSpeed: z.coerce.number().min(0, "最大速度不能小于0"),
  maxEndurance: z.coerce.number().min(0, "最大续航不能小于0"),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof boatTypeFormSchema>;

interface BoatTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boatType: API.BaseBoatTypesVO | null;
  onSuccess?: () => void;
}

export function BoatTypeDialog({
  open,
  onOpenChange,
  boatType,
  onSuccess,
}: BoatTypeDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(boatTypeFormSchema),
    defaultValues: {
      typeName: "",
      description: "",
      length: 0,
      width: 0,
      grossNumber: 0,
      maxLoad: 0,
      maxSpeed: 0,
      maxEndurance: 0,
      isEnabled: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (boatType?.id) {
        await updateBoatType({ id: boatType.id }, values);
        toast.success("更新成功");
      } else {
        await createBoatType(values);
        toast.success("添加成功");
      }
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("操作失败");
    }
  };

  // 字段配置
  const fieldConfigs: Record<keyof FormValues, FieldConfig> = {
    typeName: {
      type: "input",
      label: "类型名称",
      placeholder: "请输入类型名称",
    },
    description: {
      type: "input",
      label: "描述",
      placeholder: "请输入描述",
    },
    length: {
      type: "number",
      label: "长度(m)",
      placeholder: "请输入长度",
    },
    width: {
      type: "number",
      label: "宽度(m)",
      placeholder: "请输入宽度",
    },
    grossNumber: {
      type: "number",
      label: "总吨位(t)",
      placeholder: "请输入总吨位",
    },
    maxLoad: {
      type: "number",
      label: "最大载重(t)",
      placeholder: "请输入最大载重",
    },
    maxSpeed: {
      type: "number",
      label: "最大速度(节)",
      placeholder: "请输入最大速度",
    },
    maxEndurance: {
      type: "number",
      label: "最大续航(海里)",
      placeholder: "请输入最大续航",
    },
    isEnabled: {
      type: "switch",
      label: "启用状态",
    },
  };

  // 默认表单值
  const defaultValues: FormValues = boatType?.id
    ? {
        typeName: boatType.typeName || "",
        description: boatType.description || "",
        length: boatType.length || 0,
        width: boatType.width || 0,
        grossNumber: boatType.grossNumber || 0,
        maxLoad: boatType.maxLoad || 0,
        maxSpeed: boatType.maxSpeed || 0,
        maxEndurance: boatType.maxEndurance || 0,
        isEnabled: boatType.isEnabled ?? true,
      }
    : {
        typeName: "",
        description: "",
        length: 0,
        width: 0,
        grossNumber: 0,
        maxLoad: 0,
        maxSpeed: 0,
        maxEndurance: 0,
        isEnabled: true,
      };

  return (
    <DialogForm
      title={boatType?.id ? "编辑船舶类型" : "添加船舶类型"}
      description={boatType?.id ? "修改船舶类型信息" : "请填写船舶类型信息"}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      formSchema={boatTypeFormSchema}
      defaultValues={defaultValues}
      fieldConfigs={fieldConfigs}
      formMethods={form}
      submitButtonText="保存"
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={[
        "typeName",
        "description",
        "length",
        "width",
        "grossNumber",
        "maxLoad",
        "maxSpeed",
        "maxEndurance",
        "isEnabled",
      ]}
      key={boatType?.id ?? "new"}
    />
  );
}
