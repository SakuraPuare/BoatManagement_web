"use client";

import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Dock} from "@/types/dock";
import {createDock, updateDock} from "@/services/admin/docks";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {STATUS_CODES} from "@/lib/constants/status";

const DockFormSchema = z.object({
    dockName: z.string().min(1, "码头名称不能为空"),
    dockLocation: z.string().min(1, "码头位置不能为空"),
    status: z.boolean(),
});

type FormValues = z.infer<typeof DockFormSchema>;

interface DockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dock: Dock | null;
}

export function DockDialog({open, onOpenChange, dock}: DockDialogProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(DockFormSchema),
        defaultValues: {
            dockName: "",
            dockLocation: "",
            status: false,
        },
        values: {
            dockName: dock?.dockName || "",
            dockLocation: dock?.dockLocation || "",
            status: dock?.status || false,
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            if (dock) {
                await updateDock(dock.dockId, {
                    ...values,
                    status: values.status ? STATUS_CODES.ACTIVE : STATUS_CODES.INACTIVE,
                });
            } else {
                await createDock({
                    ...values,
                    status: values.status ? STATUS_CODES.ACTIVE : STATUS_CODES.INACTIVE,
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
                            name="dockName"
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="dockName">码头名称</Label>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dockLocation"
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="dockLocation">码头位置</Label>
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
                                <FormItem className="flex items-center gap-2">
                                    <FormLabel>启用状态</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
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
