"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userGetCurrentUser } from "@/services/api/userInfo";
import { Calendar, Edit, Mail, Phone, Shield, User } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 模拟当前用户ID，实际应该从认证状态获取
const CURRENT_USER_ID = 1;

export default function UserProfilePage() {
  const [user, setUser] = useState<API.UserWithRoleVO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const fetchUserInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userGetCurrentUser();
      if (response.data) {
        setUser(response.data);
        setEditForm({
          username: response.data.username || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("获取用户信息失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleEditSubmit = async () => {
    try {
      // TODO: 实现用户信息更新API调用
      toast.success("用户信息更新成功");
      setIsEditDialogOpen(false);
      await fetchUserInfo();
    } catch (error) {
      console.error(error);
      toast.error("更新失败");
    }
  };

  const getUserStatusBadge = (user: API.UserWithRoleVO) => {
    if (user.isBlocked) {
      return <Badge variant="destructive">已封禁</Badge>;
    }
    if (user.isActive) {
      return <Badge variant="default">正常</Badge>;
    }
    return <Badge variant="secondary">未激活</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">未找到用户信息</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">个人信息</h1>
          <p className="text-muted-foreground">查看和管理您的个人资料</p>
        </div>
        <Button onClick={() => setIsEditDialogOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          编辑信息
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 基本信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              基本信息
            </CardTitle>
            <CardDescription>您的基本账户信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">用户ID</Label>
              <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">用户名</Label>
              <p className="text-sm text-muted-foreground">
                {user.username || "-"}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">邮箱</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {user.email || "-"}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">电话</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {user.phone || "-"}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">账户状态</Label>
              <div className="mt-1">{getUserStatusBadge(user)}</div>
            </div>
          </CardContent>
        </Card>

        {/* 账户状态卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              账户状态
            </CardTitle>
            <CardDescription>您的账户安全和状态信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">账户激活</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.isActive ? "default" : "secondary"}>
                  {user.isActive ? "已激活" : "未激活"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">账户封禁</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.isBlocked ? "destructive" : "default"}>
                  {user.isBlocked ? "已封禁" : "正常"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">注册时间</Label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">最后更新</Label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 安全提示 */}
      <Card>
        <CardHeader>
          <CardTitle>安全提示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 请定期更新您的密码以确保账户安全</p>
            <p>• 不要在公共场所或不安全的网络环境下登录账户</p>
            <p>• 如发现账户异常，请及时联系客服</p>
            <p>• 请确保您的邮箱和手机号码是最新的，以便接收重要通知</p>
          </div>
        </CardContent>
      </Card>

      {/* 编辑信息对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑个人信息</DialogTitle>
            <DialogDescription>
              更新您的基本信息。请确保信息准确无误。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <Label htmlFor="phone">电话</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                placeholder="请输入电话号码"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              取消
            </Button>
            <Button type="button" onClick={handleEditSubmit}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
