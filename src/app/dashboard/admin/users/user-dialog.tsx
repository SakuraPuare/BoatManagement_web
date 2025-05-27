"use client";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ROLE_CHINESE_NAMES,
  ROLE_COLORS,
  ROLE_MASKS,
} from "@/lib/constants/role";
import { cn } from "@/lib/utils";
import {
  adminCreateUser,
  adminUpdateUser,
} from "@/services/api/adminUser";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const userFormSchema = z
  .object({
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
    email: z
      .string()
      .email("请输入有效的邮箱地址")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码")
      .optional()
      .or(z.literal("")),
    role: z.number(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      return !!(data.username || data.email || data.phone);
    },
    {
      message: "用户名、邮箱、手机号至少填写一项",
      path: ["username"],
    }
  );

type FormValues = z.infer<typeof userFormSchema>;

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: API.BaseAccountsVO;
}

export function UserDialog({ open, onOpenChange, user }: UserDialogProps) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: ROLE_MASKS.USER,
      isActive: true,
    },
    values: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: ROLE_MASKS.USER,
      isActive: user?.isActive || false,
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
      } else {
        await adminCreateUser(values);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("操作失败:", error);
      toast.error(
        "操作失败: " + (error instanceof Error ? error.message : "未知错误")
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{user ? "编辑用户" : "添加用户"}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入用户名" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="请输入邮箱地址"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>手机号码</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入手机号码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={() => (
                <FormItem>
                  <FormLabel>用户角色</FormLabel>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>激活状态</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
                {form.formState.isSubmitting
                  ? "提交中..."
                  : user
                  ? "更新"
                  : "创建"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
