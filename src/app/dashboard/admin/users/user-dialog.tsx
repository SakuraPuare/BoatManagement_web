"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { User } from "./types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const initialFormData = {
  username: "",
  email: "",
  phone: "",
  isActive: true,
  isBlocked: false,
};

export function UserDialog({
  open,
  onOpenChange,
  user = null,
}: UserDialogProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        isActive: user.isActive ?? true,
        isBlocked: user.isBlocked ?? false,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [user, open]);

  const createUser = async (data: typeof formData) => {
    const response = await api.post("/admin/users/save", {
      body: data,
    });
    return response;
  };

  const updateUser = async (data: typeof formData) => {
    if (!user?.userId) return;
    
    const response = await api.put(`/admin/users/update`, {
      body: {
        userId: user.userId,
        ...data,
      },
    });
    return response;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username && !formData.email && !formData.phone) {
      newErrors.form = "用户名、邮箱、手机号至少填写一项";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "请输入有效的手机号";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (user?.uuid) {
        await updateUser(formData);
        toast.success("用户更新成功");
      } else {
        await createUser(formData);
        toast.success("用户创建成功");
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error(user ? "用户更新失败" : "用户创建失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "编辑用户" : "添加用户"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-500">{errors.form}</div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={errors.username ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <div className="text-sm text-red-500">{errors.email}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">手机号</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <div className="text-sm text-red-500">{errors.phone}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">账号状态</Label>
            <Select
              value={formData.isActive ? "active" : "inactive"}
              onValueChange={(value) =>
                setFormData({ ...formData, isActive: value === "active" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">已激活</SelectItem>
                <SelectItem value="inactive">未激活</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="blocked">封禁状态</Label>
            <Select
              value={formData.isBlocked ? "blocked" : "unblocked"}
              onValueChange={(value) =>
                setFormData({ ...formData, isBlocked: value === "blocked" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unblocked">正常</SelectItem>
                <SelectItem value="blocked">已封��</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
