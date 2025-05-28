"use client";
import React from "react";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Button } from "@/components/ui/button";
import { adminUpdateBoat } from "@/services/api/adminBoat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const boatFormSchema = z.object({
  name: z.string().min(1, "请输入船名"),
  typeId: z.number().min(1, "请选择船只类型"),
  dockId: z.number().min(1, "请选择码头"),
});

type FormValues = z.infer<typeof boatFormSchema>;

interface BoatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO | null;
  boatTypes: API.BaseBoatTypesVO[];
  docks: API.BaseDocksVO[];
  onOpenBoatTypeDialog?: () => void;
  onSuccess?: () => void;
}

export function BoatDialog({
  open,
  onOpenChange,
  boat,
  boatTypes,
  docks,
  onOpenBoatTypeDialog,
  onSuccess,
}: BoatDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      name: "",
      typeId: 0,
      dockId: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const boatType = boatTypes.find(
      (type) => type.id === Number(values.typeId)
    );
    if (!boatType) {
      toast.error("船只类型不存在");
      return;
    }
    try {
      if (boat?.id) {
        await adminUpdateBoat({ id: boat.id }, values);
      }
      onOpenChange(false);
      toast.success(boat?.id ? "更新成功" : "创建成功");
      onSuccess?.();
    } catch (error) {
      console.error("操作失败:", error);
      toast.error(
        "操作失败: " + (error instanceof Error ? error.message : "未知错误")
      );
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
      type: "custom",
      label: "船只类型",
      render: ({ field }) => (
        <div className="flex gap-2">
          <select
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={field.value?.toString()}
            onChange={(e) => field.onChange(Number(e.target.value))}
          >
            <option value="">选择船只类型</option>
            {boatTypes.map((type) => (
              <option key={type.id} value={type.id?.toString() || ""}>
                {type.typeName}
              </option>
            ))}
          </select>
          {onOpenBoatTypeDialog && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenBoatTypeDialog();
                onOpenChange(false);
              }}
            >
              新增类型
            </Button>
          )}
        </div>
      ),
    },
    dockId: {
      type: "select",
      label: "所属码头",
      placeholder: "选择码头",
      options: docks.map((dock) => ({
        value: dock.id?.toString() || "",
        label: dock.name || "",
      })),
    },
  };

  // 默认表单值
  const defaultValues: FormValues = boat?.id
    ? {
        name: boat.name || "",
        typeId: boat.typeId || 0,
        dockId: boat.dockId || 0,
      }
    : {
        name: "",
        typeId: 0,
        dockId: 0,
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
      submitButtonText={boat?.id ? "更新" : "创建"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["name", "typeId", "dockId"]}
      key={boat?.id ?? "new"}
    />
  );
}
