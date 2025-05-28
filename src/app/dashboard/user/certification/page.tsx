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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { userCertify } from "@/services/api/certifyController";
import { AlertCircle, CheckCircle, Clock, UserCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// 模拟当前用户ID和认证状态，实际应该从认证状态获取
const CURRENT_USER_ID = 1;

const certifyFormSchema = z.object({
  realName: z
    .string()
    .min(2, "真实姓名至少2个字符")
    .max(50, "真实姓名不能超过50个字符"),
  idCard: z
    .string()
    .regex(
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      "请输入正确的身份证号码"
    ),
});

type CertifyStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

const STATUS_CONFIG = {
  NONE: {
    label: "未认证",
    variant: "secondary" as const,
    icon: <X className="w-4 h-4" />,
    description: "您还未提交实名认证申请",
  },
  PENDING: {
    label: "审核中",
    variant: "outline" as const,
    icon: <Clock className="w-4 h-4" />,
    description: "您的认证申请正在审核中，请耐心等待",
  },
  APPROVED: {
    label: "已认证",
    variant: "default" as const,
    icon: <CheckCircle className="w-4 h-4" />,
    description: "恭喜！您已通过实名认证",
  },
  REJECTED: {
    label: "审核失败",
    variant: "destructive" as const,
    icon: <AlertCircle className="w-4 h-4" />,
    description: "很抱歉，您的认证申请未通过审核，请重新提交",
  },
};

export default function UserCertificationPage() {
  const [certifyStatus, setCertifyStatus] = useState<CertifyStatus>("NONE");
  const [certifyInfo, setCertifyInfo] = useState<API.BaseUserCertifyVO | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof certifyFormSchema>>({
    resolver: zodResolver(certifyFormSchema),
    defaultValues: {
      realName: "",
      idCard: "",
    },
  });

  const fetchCertifyStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: 实现获取用户认证状态的API调用
      // 这里模拟API响应
      const mockResponse = {
        status: "NONE" as CertifyStatus,
        data: null as API.BaseUserCertifyVO | null,
      };

      setCertifyStatus(mockResponse.status);
      setCertifyInfo(mockResponse.data);

      if (mockResponse.data) {
        form.reset({
          realName: mockResponse.data.realName || "",
          idCard: mockResponse.data.idCard || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("获取认证状态失败");
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchCertifyStatus();
  }, [fetchCertifyStatus]);

  const onSubmit = async (data: z.infer<typeof certifyFormSchema>) => {
    setIsSubmitting(true);
    try {
      await userCertify(data);
      toast.success("认证申请提交成功，请等待审核");
      setCertifyStatus("PENDING");
      await fetchCertifyStatus();
    } catch (error) {
      console.error(error);
      toast.error("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusConfig = STATUS_CONFIG[certifyStatus];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">实名认证</h1>
          <p className="text-muted-foreground">
            完成实名认证以获得更多功能权限
          </p>
        </div>
      </div>

      {/* 认证状态卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            认证状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant={statusConfig.variant}
              className="flex items-center gap-1"
            >
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {statusConfig.description}
          </p>

          {certifyInfo && (
            <div className="mt-4 space-y-2">
              <div>
                <Label className="text-sm font-medium">申请时间</Label>
                <p className="text-sm text-muted-foreground">
                  {certifyInfo.createdAt
                    ? new Date(certifyInfo.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>
              {certifyInfo.updatedAt && (
                <div>
                  <Label className="text-sm font-medium">更新时间</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(certifyInfo.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 认证表单 */}
      {(certifyStatus === "NONE" || certifyStatus === "REJECTED") && (
        <Card>
          <CardHeader>
            <CardTitle>提交认证申请</CardTitle>
            <CardDescription>
              请填写真实的个人信息，我们将严格保护您的隐私
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="realName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>真实姓名</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入您的真实姓名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>身份证号码</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入您的身份证号码" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "提交中..." : "提交认证申请"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* 认证说明 */}
      <Card>
        <CardHeader>
          <CardTitle>认证说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">
                为什么需要实名认证？
              </h4>
              <p>实名认证有助于保障您的账户安全，并让您享受更多平台功能。</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">认证流程</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>填写真实姓名和身份证号码</li>
                <li>提交认证申请</li>
                <li>等待系统审核（通常1-3个工作日）</li>
                <li>审核通过后即可享受完整功能</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">隐私保护</h4>
              <p>
                我们承诺严格保护您的个人信息，仅用于身份验证，不会泄露给第三方。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 注意事项 */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>注意：</strong>
          请确保填写的信息真实有效，虚假信息将导致认证失败。认证通过后，个人信息将无法修改，请仔细核对。
        </AlertDescription>
      </Alert>
    </div>
  );
}
