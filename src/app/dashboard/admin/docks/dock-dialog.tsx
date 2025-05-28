import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { adminCreateDock, adminUpdateDock } from "@/services/api/adminDock";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";



export const dockFormSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  address: z.string().min(1, "地址不能为空"),
  contactPhone: z.string().min(1, "联系电话不能为空"),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof dockFormSchema>;

interface DockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dock: API.BaseDocksVO | null;
}

export function DockDialog({ open, onOpenChange, dock }: DockDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(dockFormSchema),
    defaultValues: {
      name: "",
      longitude: 0,
      latitude: 0,
      address: "",
      contactPhone: "",
      isEnabled: true,
    },
    values: {
      name: dock?.name || "",
      longitude: dock?.longitude || 0,
      latitude: dock?.latitude || 0,
      address: dock?.address || "",
      contactPhone: dock?.contactPhone || "",
      isEnabled: dock?.isEnabled || false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (dock?.id) {
        await adminUpdateDock(
          { id: dock.id },
          {
            ...values,
            isEnabled: values.isEnabled,
          }
        );
      } else {
        await adminCreateDock({
          ...values,
          isEnabled: values.isEnabled,
        });
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("保存码头数据失败:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dock ? "编辑码头" : "添加码头"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">码头名称</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="longitude">经度</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="latitude">纬度</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地址</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>联系电话</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>状态</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                取消
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
