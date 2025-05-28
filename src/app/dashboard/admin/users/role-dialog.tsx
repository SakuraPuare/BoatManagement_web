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
}

export function RoleDialog({ open, onOpenChange, user }: RoleDialogProps) {
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
    } catch (error) {
      console.error("更新权限失败:", error);
      toast.error(
        "更新权限失败: " + (error instanceof Error ? error.message : "未知错误")
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader>
          <AlertDialogTitle>权限设置 - {user.username}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={() => (
                <FormItem>
                  <FormLabel>用户角色</FormLabel>
                  <FormDescription>
                    选择要分配给用户的角色。用户可以同时拥有多个角色。
                  </FormDescription>
                  <div className="space-y-4">
                    {Object.entries(ROLE_MASKS).map(([_, roleValue]) => (
                      <div
                        key={roleValue}
                        className="flex items-start space-x-4"
                      >
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
                        <FormDescription className="mt-2">
                          {ROLE_DESCRIPTIONS[roleValue]}
                        </FormDescription>
                      </div>
                    ))}
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
                {form.formState.isSubmitting ? "更新中..." : "更新权限"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
