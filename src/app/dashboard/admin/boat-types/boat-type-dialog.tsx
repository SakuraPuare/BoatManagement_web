import React, { useEffect, useState } from "react";
import { DialogForm, FieldConfig } from "@/components/data-form";
import {
  adminCreateBoatType,
  adminUpdateBoatType,
} from "@/services/api/adminBoatType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const boatTypeFormSchema = z.object({
  typeName: z
    .string()
    .min(1, "船型名称不能为空")
    .max(50, "船型名称不能超过50个字符"),
  description: z
    .string()
    .min(1, "船只描述不能为空")
    .max(200, "船只描述不能超过200个字符"),
  length: z.coerce
    .number()
    .min(1, "长度不能小于1")
    .max(10000, "长度不能大于10000"),
  width: z.coerce.number().min(0, "宽度不能小于0").max(100, "宽度不能大于100"),
  grossNumber: z.coerce
    .number()
    .min(1, "总吨位不能小于1")
    .max(10000, "总吨位不能大于10000"),
  maxLoad: z.coerce
    .number()
    .min(0, "最大载重量不能小于0")
    .max(10000, "最大载重量不能大于10000"),
  maxSpeed: z.coerce
    .number()
    .min(0, "最大速度不能小于0")
    .max(100, "最大速度不能大于100"),
  maxEndurance: z.coerce.number().min(0, "最大续航不能小于0"),
  price: z.coerce.number().min(0, "价格不能小于0"),
  isEnabled: z.boolean().optional(),
});

type FormValues = z.infer<typeof boatTypeFormSchema>;

// 默认表单值
const defaultBoatTypeValues: Partial<FormValues> = {
  typeName: "",
  description: "",
  length: 0,
  width: 0,
  grossNumber: 0,
  maxLoad: 0,
  maxSpeed: 0,
  maxEndurance: 0,
  price: 0,
  isEnabled: true,
};

// 表单字段配置
const fieldConfigs: Record<keyof FormValues, FieldConfig> = {
  typeName: {
    type: "input",
    label: "船型名称",
    placeholder: "请输入船型名称",
  },
  description: {
    type: "textarea",
    label: "描述",
    placeholder: "请输入船只描述",
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
    label: "最大速度(km/h)",
    placeholder: "请输入最大速度",
  },
  maxEndurance: {
    type: "number",
    label: "最大续航(km)",
    placeholder: "请输入最大续航",
  },
  price: {
    type: "number",
    label: "价格(元)",
    placeholder: "请输入价格",
  },
  isEnabled: {
    type: "switch",
    label: "启用状态",
  },
};

interface BoatTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  boatType?: API.BaseBoatTypesVO | null;
}

export function BoatTypeDialog({
  open,
  onOpenChange,
  onSuccess,
  boatType,
}: BoatTypeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!boatType;

  // 创建表单方法
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(boatTypeFormSchema),
    defaultValues: isEditing
      ? {
          typeName: boatType?.typeName || "",
          description: boatType?.description || "",
          length: boatType?.length || 0,
          width: boatType?.width || 0,
          grossNumber: boatType?.grossNumber || 0,
          maxLoad: boatType?.maxLoad || 0,
          maxSpeed: boatType?.maxSpeed || 0,
          maxEndurance: boatType?.maxEndurance || 0,
          price: boatType?.price || 0,
          isEnabled: boatType?.isEnabled ?? true,
        }
      : defaultBoatTypeValues,
  });

  // 监听 boatType 变化，更新表单默认值
  useEffect(() => {
    if (open) {
      if (isEditing && boatType) {
        formMethods.reset({
          typeName: boatType.typeName || "",
          description: boatType.description || "",
          length: boatType.length || 0,
          width: boatType.width || 0,
          grossNumber: boatType.grossNumber || 0,
          maxLoad: boatType.maxLoad || 0,
          maxSpeed: boatType.maxSpeed || 0,
          maxEndurance: boatType.maxEndurance || 0,
          price: boatType.price || 0,
          isEnabled: boatType.isEnabled ?? true,
        });
      } else {
        formMethods.reset(defaultBoatTypeValues);
      }
    }
  }, [boatType, open, isEditing, formMethods]);

  // 处理表单提交
  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (isEditing && boatType?.id) {
        await adminUpdateBoatType({ id: boatType.id }, data);
        toast.success("船型更新成功");
      } else {
        await adminCreateBoatType(data);
        toast.success("船型创建成功");
      }

      formMethods.reset(defaultBoatTypeValues);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to save boat type:", error);
      toast.error(isEditing ? "更新船型失败" : "创建船型失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑船型" : "添加船型"}
      description={isEditing ? "修改船型信息" : "请填写船型信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultBoatTypeValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={boatTypeFormSchema}
      defaultValues={
        isEditing
          ? {
              typeName: boatType?.typeName || "",
              description: boatType?.description || "",
              length: boatType?.length || 0,
              width: boatType?.width || 0,
              grossNumber: boatType?.grossNumber || 0,
              maxLoad: boatType?.maxLoad || 0,
              maxSpeed: boatType?.maxSpeed || 0,
              maxEndurance: boatType?.maxEndurance || 0,
              price: boatType?.price || 0,
              isEnabled: boatType?.isEnabled ?? true,
            }
          : defaultBoatTypeValues
      }
      fieldConfigs={fieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "创建"}
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
        "price",
        "isEnabled",
      ]}
      key={boatType?.id ?? "new"}
    />
  );
}
