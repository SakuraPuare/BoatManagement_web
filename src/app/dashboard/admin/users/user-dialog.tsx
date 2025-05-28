"use client";
import React from "react";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Button } from "@/components/ui/button";
import {
  ROLE_CHINESE_NAMES,
  ROLE_COLORS,
  ROLE_MASKS,
} from "@/lib/constants/role";
import { cn } from "@/lib/utils";
import { adminCreateUser, adminUpdateUser } from "@/services/api/adminUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const userFormSchema = z.object({
  username: z
    .string()
    .min(2, "用户名至少需要2个字符")
    .max(50, "用户名不能超过50个字符")
    .regex(
      /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
      "用户名只能包含字母、数字、下划线和中文"
    )
    .optional()
    .or(z.literal("")),
  email: z.string().email("请输入有效的邮箱地址").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码")
    .optional()
    .or(z.literal("")),
  role: z.number(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof userFormSchema>;

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: API.BaseAccountsVO;
  onSuccess?: () => void;
}

export function UserDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: ROLE_MASKS.USER,
      isActive: true,
    },
  });

  const role = form.watch("role");

  const toggleRole = (roleValue: number) => {
    const currentRoles = form.getValues("role");
    form.setValue("role", currentRoles ^ roleValue, { shouldValidate: true });
  };

  const hasRole = (roleValue: number) => {
    return (role & roleValue) === roleValue;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (user.id) {
        await adminUpdateUser({ id: user.id }, values);
        toast.success("用户更新成功");
      } else {
        await adminCreateUser(values);
        toast.success("用户创建成功");
      }
      onOpenChange(false);
      form.reset();
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
    username: {
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
    },
    email: {
      type: "input",
      label: "邮箱",
      placeholder: "请输入邮箱地址",
    },
    phone: {
      type: "input",
      label: "手机号码",
      placeholder: "请输入手机号码",
    },
    role: {
      type: "custom",
      label: "用户角色",
      render: ({ field }) => (
        <div className="flex flex-wrap gap-2">
          {Object.entries(ROLE_MASKS).map(([_, roleValue]) => (
            <Button
              key={roleValue}
              type="button"
              variant={hasRole(roleValue) ? "default" : "outline"}
              onClick={() => toggleRole(roleValue)}
              className={cn(
                "h-8",
                hasRole(roleValue) && ROLE_COLORS[roleValue]
              )}
            >
              {ROLE_CHINESE_NAMES[roleValue]}
            </Button>
          ))}
        </div>
      ),
    },
    isActive: {
      type: "switch",
      label: "激活状态",
    },
  };

  // 默认表单值
  const defaultValues: FormValues = user?.id
    ? {
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: ROLE_MASKS.USER, // 使用默认值，因为 user 对象可能没有 role 属性
        isActive: user?.isActive || false,
      }
    : {
        username: "",
        email: "",
        phone: "",
        role: ROLE_MASKS.USER,
        isActive: true,
      };

  return (
    <DialogForm
      title={user?.id ? "编辑用户" : "添加用户"}
      description={user?.id ? "修改用户信息" : "请填写用户信息"}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      formSchema={userFormSchema}
      defaultValues={defaultValues}
      fieldConfigs={fieldConfigs}
      formMethods={form}
      submitButtonText={
        form.formState.isSubmitting ? "提交中..." : user?.id ? "更新" : "创建"
      }
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["username", "email", "phone", "role", "isActive"]}
      key={user?.id ?? "new"}
    />
  );
}
