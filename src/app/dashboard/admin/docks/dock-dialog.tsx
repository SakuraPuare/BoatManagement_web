"use client";

import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import type {API} from "@/services/api/typings";
import {addDocks, updateDocks} from "@/services/api/adminDock";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {STATUS_CODES} from "@/lib/constants/status";

const DockFormSchema = z.object({
    name: z.string().min(1, "码头名称不能为空"),
    location: z.string().min(1, "码头位置不能为空"),
    address: z.string().min(1, "地址不能为空"),
    contactPhone: z.string().min(1, "联系电话不能为空"),
    status: z.string().min(1, "状态不能为空"),
});

type FormValues = z.infer<typeof DockFormSchema>;

interface DockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dock: API.BaseDocksVO | null;
}

export function DockDialog({open, onOpenChange, dock}: DockDialogProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(DockFormSchema),
        defaultValues: {
            name: "",
            location: "",
            address: "",
            contactPhone: "",
            status: STATUS_CODES.ACTIVE.toString(),
        },
        values: {
            name: dock?.name || "",
            location: dock?.location || "",
            address: dock?.address || "",
            contactPhone: dock?.contactPhone || "",
            status: dock?.status || STATUS_CODES.ACTIVE.toString(),
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            if (dock?.id) {
                await updateDocks({id: dock.id}, {
                    ...values,
                    status: values.status,
                });
            } else {
                await addDocks({}, {
                    ...values,
                    status: values.status,
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
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="name">码头名称</Label>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="location">码头位置</Label>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>地址</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>联系电话</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>  
                                    <FormLabel>状态</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择状态" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={STATUS_CODES.ACTIVE.toString()}>正常</SelectItem>
                                                <SelectItem value={STATUS_CODES.INACTIVE.toString()}>停用</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
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
