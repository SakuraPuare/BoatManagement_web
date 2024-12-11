"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { User } from "./types";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { ROLE_MASKS, ROLE_CHINESE_NAMES } from "@/lib/role";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function RoleDialog({ open, onOpenChange, user }: RoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  // 当对话框打开时，根据用户当前角色设置选中状态
  useEffect(() => {
    if (user?.role) {
      const roles: number[] = [];
      Object.entries(ROLE_MASKS).forEach(([_, mask]) => {
        if (user.role & mask) {
          roles.push(mask);
        }
      });
      setSelectedRoles(roles);
      console.log(roles);
    }
  }, [user]);

  const handleRoleToggle = (roleMask: number) => {
    setSelectedRoles((current) => {
      if (current.includes(roleMask)) {
        return current.filter((r) => r !== roleMask);
      } else {
        return [...current, roleMask];
      }
    });
  };

  const handleSubmit = async () => {
    if (!user?.userId) return;

    setIsSubmitting(true);
    try {
      // 计算新的角色掩码
      const newRole = selectedRoles.reduce((acc, curr) => acc | curr, 0);

      await api.put("/admin/users/update", {
        body: {
          userId: user.userId,
          role: newRole,
        },
      });

      toast.success("权限更新成功");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update user roles:", error);
      toast.error("权限更新失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>设置用户权限</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            用户：{user?.username || user?.email || user?.phone}
          </div>

          <div className="space-y-4">
            {Object.entries(ROLE_MASKS).map(([key, mask]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedRoles.includes(mask)}
                  onCheckedChange={() => handleRoleToggle(mask)}
                  disabled={isSubmitting}
                />
                <Label htmlFor={key}>{ROLE_CHINESE_NAMES[mask]}</Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
