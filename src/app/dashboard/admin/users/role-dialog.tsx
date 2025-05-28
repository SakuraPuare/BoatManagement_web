"use client";
import React from "react";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Button } from "@/components/ui/button";
import {
  ROLE_CHINESE_NAMES,
  ROLE_COLORS,
  ROLE_DESCRIPTIONS,
  ROLE_MASKS,
} from "@/lib/constants/role";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const RoleFormSchema = z.object({
  role: z.number(),
});

type FormValues = z.infer<typeof RoleFormSchema>;

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: API.BaseAccountsVO;
  onSuccess?: () => void;
}

export function RoleDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: RoleDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      role: ROLE_MASKS.USER,
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
      if (!user.id) return;
      // TODO: Implement role update when API supports it
      toast.success("角色更新功能暂未实现");
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("更新权限失败:", error);
      toast.error(
        "更新权限失败: " + (error instanceof Error ? error.message : "未知错误")
      );
    }
  };

  // 字段配置
  const fieldConfigs: Record<keyof FormValues, FieldConfig> = {
    role: {
      type: "custom",
      label: "用户角色",
      render: ({ field }) => (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            选择要分配给用户的角色。用户可以同时拥有多个角色。
          </p>
          {Object.entries(ROLE_MASKS).map(([_, roleValue]) => (
            <div key={roleValue} className="flex items-start space-x-4">
              <Button
                type="button"
                variant={hasRole(roleValue) ? "default" : "outline"}
                onClick={() => toggleRole(roleValue)}
                className={cn(
                  "min-w-[100px]",
                  hasRole(roleValue) && ROLE_COLORS[roleValue]
                )}
              >
                {ROLE_CHINESE_NAMES[roleValue]}
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                {ROLE_DESCRIPTIONS[roleValue]}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  };

  // 默认表单值
  const defaultValues: FormValues = {
    role: ROLE_MASKS.USER,
  };

  return (
    <DialogForm
      title={`权限设置 - ${user.username}`}
      description="管理用户的角色权限"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      formSchema={RoleFormSchema}
      defaultValues={defaultValues}
      fieldConfigs={fieldConfigs}
      formMethods={form}
      submitButtonText={form.formState.isSubmitting ? "更新中..." : "更新权限"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["role"]}
      key={user?.id ?? "new"}
    />
  );
}
