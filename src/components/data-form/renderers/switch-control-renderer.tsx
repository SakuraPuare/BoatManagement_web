import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldConfig } from "../types";

interface SwitchControlRendererProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldConfig: FieldConfig;
}

export function SwitchControlRenderer<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({ field, fieldConfig }: SwitchControlRendererProps<TFieldValues, TName>) {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        {!fieldConfig.hideLabel && fieldConfig.label && (
          <FormLabel className="text-base">{fieldConfig.label}</FormLabel>
        )}
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={fieldConfig.disabled}
        />
      </FormControl>
    </FormItem>
  );
}
