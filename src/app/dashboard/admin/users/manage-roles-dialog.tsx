import React from "react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { adminGetAllRoles } from "@/services/api/adminUser";
// 假设有这个 API
import { getRoleList } from "@/utils/role";
import { RoleChineseName } from "@/constants/role";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ManageUserRolesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  user: API.BaseAccountsVO | null;
}

export function ManageUserRolesDialog({
  open,
  onOpenChange,
  onSuccess,
  user,
}: ManageUserRolesDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingRoles, setIsFetchingRoles] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<API.BaseRoleVO[]>([]);
  const [selectedRoleCodes, setSelectedRoleCodes] = useState<string[]>([]);

  // 获取所有可用角色
  useEffect(() => {
    const fetchRoles = async () => {
      setIsFetchingRoles(true);
      try {
        const res = await adminGetAllRoles({}); // 获取所有角色，可能需要调整 API 参数
        setAvailableRoles(res.data || []);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        toast.error("获取角色列表失败");
      } finally {
        setIsFetchingRoles(false);
      }
    };
    if (open) {
      fetchRoles();
    }
  }, [open]);

  // 当 user 或 dialog 打开时，更新选中的角色
  useEffect(() => {
    if (user?.role) {
      setSelectedRoleCodes(getRoleList(user.role));
    } else {
      setSelectedRoleCodes([]);
    }
  }, [user, open]);

  const handleRoleChange = (roleCode: string, checked: boolean) => {
    setSelectedRoleCodes((prev) =>
      checked ? [...prev, roleCode] : prev.filter((code) => code !== roleCode)
    );
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      // 将角色代码数组转换为后端需要的格式（可能是逗号分隔的字符串）
      const rolesString = selectedRoleCodes.join(",");
      // 调用更新用户角色的 API，注意替换为实际的 API 调用
      await adminUpdateUserRoles(
        { userId: user.id }, // Params
        { role: rolesString } // Body or Query, depends on API design
      );
      toast.success(`用户 "${user.username || user.id}" 的角色已更新`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update user roles:", error);
      toast.error("更新用户角色失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            管理用户角色 - {user?.username || user?.id || "未知用户"}
          </DialogTitle>
          <DialogDescription>
            为用户分配或移除角色。更改将在保存后生效。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isFetchingRoles ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>正在加载角色列表...</span>
            </div>
          ) : availableRoles.length > 0 ? (
            <div className="space-y-2">
              {availableRoles.map((role) => (
                <div
                  key={role.roleCode}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`role-${role.roleCode}`}
                    checked={selectedRoleCodes.includes(role.roleCode || "")}
                    onCheckedChange={(checked) =>
                      handleRoleChange(role.roleCode || "", !!checked)
                    }
                    disabled={isLoading} // 保存时禁用
                  />
                  <Label
                    htmlFor={`role-${role.roleCode}`}
                    className="cursor-pointer"
                  >
                    {RoleChineseName[role.roleCode || ""] || role.roleName} (
                    {role.roleCode})
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              没有可用的角色。
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            取消
          </Button>
          <Button onClick={handleSave} disabled={isLoading || isFetchingRoles}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            保存更改
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 注意：
// 1. 请确保 `adminGetAllRoles` API 不需要分页参数或可以传递空对象获取全部。
// 2. 请确保你有一个 `adminUpdateUserRoles` API 用于更新用户角色。你需要根据实际的 API 定义调整参数和请求体。
//    这里的示例假设它接收 userId 作为路径参数，并接收 { role: "ROLE_A,ROLE_B" } 这样的请求体。
// 3. `RoleChineseName` 需要包含所有可能的角色代码以正确显示中文名。
// 4. `getRoleList` 函数需要能正确解析用户当前的角色字符串（假设是逗号分隔）。
