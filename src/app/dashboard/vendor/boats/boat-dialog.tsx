"use client";
import React, { useEffect, useRef } from "react";

import { DialogForm, FieldConfig } from "@/components/data-form";
import { vendorCreateBoat, vendorUpdateBoat } from "@/services/api/vendorBoat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const boatFormSchema = z.object({
  name: z.string().min(1, "请输入船名"),
  typeId: z.string().min(1, "请选择船型"),
  dockId: z.string().min(1, "请选择码头"),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof boatFormSchema>;

interface BoatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO | null;
  boatTypes: API.BaseBoatTypesVO[];
  docks: API.BaseDocksVO[];
  onSuccess?: () => void;
}

export function BoatDialog({
  open,
  onOpenChange,
  boat,
  boatTypes,
  docks,
  onSuccess,
}: BoatDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      name: "",
      typeId: "",
      dockId: "",
      isEnabled: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (boat?.id) {
        console.log("更新", values);
        const response = await vendorUpdateBoat(
          { id: boat.id },
          {
            ...values,
            typeId: parseInt(values.typeId),
            dockId: parseInt(values.dockId),
          }
        );
        console.log(response);
        toast.success("更新成功");
      } else {
        await vendorCreateBoat({
          ...values,
          typeId: parseInt(values.typeId),
          dockId: parseInt(values.dockId),
        });
        toast.success("添加成功");
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("操作失败");
    }
  };

  // 字段配置
  const fieldConfigs: Record<keyof FormValues, FieldConfig> = {
    name: {
      type: "input",
      label: "船名",
      placeholder: "请输入船名",
    },
    typeId: {
      type: "select",
      label: "船型",
      placeholder: "选择船型",
      options: boatTypes.map((type) => ({
        value: type.id?.toString() || "",
        label: type.typeName || "",
      })),
    },
    dockId: {
      type: "select",
      label: "所在码头",
      placeholder: "选择码头",
      options: docks.map((dock) => ({
        value: dock.id?.toString() || "",
        label: dock.name || "",
      })),
    },
    isEnabled: {
      type: "switch",
      label: "启用状态",
    },
  };

  // 默认表单值
  const defaultValues: FormValues = boat?.id
    ? {
        name: boat.name || "",
        typeId: boat.typeId?.toString() || "",
        dockId: boat.dockId?.toString() || "",
        isEnabled: boat.isEnabled ?? true,
      }
    : {
        name: "",
        typeId: "",
        dockId: "",
        isEnabled: true,
      };

  return (
    <DialogForm
      title={boat?.id ? "编辑船只" : "添加船只"}
      description={boat?.id ? "修改船只信息" : "请填写船只信息"}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      formSchema={boatFormSchema}
      defaultValues={defaultValues}
      fieldConfigs={fieldConfigs}
      formMethods={form}
      submitButtonText={boat?.id ? "更新" : "添加"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["name", "typeId", "dockId", "isEnabled"]}
      key={boat?.id ?? "new"}
    />
  );
}
