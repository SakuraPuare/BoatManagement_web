import React, { useEffect, useRef } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { vendorCreateBoat, vendorUpdateBoat } from "@/services/api/vendorBoat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const boatFormSchema = z.object({
  name: z.string().min(1, "请输入船名"),
  typeId: z.string().min(1, "请选择船型"),
  dockId: z.string().min(1, "请选择码头"),
  isEnabled: z.boolean(),
});

interface BoatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO | null;
  boatTypes: API.BaseBoatTypesVO[];
  docks: API.BaseDocksVO[];
}

export function BoatDialog({
  open,
  onOpenChange,
  boat,
  boatTypes,
  docks,
}: BoatDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof boatFormSchema>>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      name: boat?.name || "",
      typeId: boat?.typeId?.toString() || "",
      dockId: boat?.dockId?.toString() || "",
      isEnabled: boat?.isEnabled ?? true,
    },
  });

  useEffect(() => {
    if (boat) {
      form.reset({
        name: boat.name || "",
        typeId: boat.typeId?.toString() || "",
        dockId: boat.dockId?.toString() || "",
        isEnabled: boat.isEnabled ?? true,
      });
    } else {
      form.reset({
        name: "",
        typeId: "",
        dockId: "",
        isEnabled: true,
      });
    }
  }, [boat, form]);

  const onSubmit = async (values: z.infer<typeof boatFormSchema>) => {
    try {
      if (boat?.id) {
        console.log("更新", values);
        const response = await vendorUpdateBoat(
          { id: boat.id },
          {
            ...values,
            typeId: parseInt(values.typeId),
            dockId: parseInt(values.dockId),
          }
        );
        console.log(response);
        toast.success("更新成功");
      } else {
        await vendorCreateBoat({
          ...values,
          typeId: parseInt(values.typeId),
          dockId: parseInt(values.dockId),
        });
        toast.success("添加成功");
      }
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("操作失败");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          cancelRef.current?.focus();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {boat?.id ? "编辑船只" : "添加船只"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入船名" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船型</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择船型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {boatTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id?.toString() || ""}
                        >
                          {type.typeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dockId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所在码头</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择码头" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {docks.map((dock) => (
                        <SelectItem
                          key={dock.id}
                          value={dock.id?.toString() || ""}
                        >
                          {dock.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between py-2">
                  <FormLabel className="flex-1">启用状态</FormLabel>
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
                ref={cancelRef}
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                取消
              </Button>
              <Button type="submit">{boat?.id ? "更新" : "添加"}</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
