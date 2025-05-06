import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // 导入 Switch 组件
import { FieldConfig } from "../types";

interface SwitchControlRendererProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldConfig: FieldConfig;
}

export function SwitchControlRenderer<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({ field, fieldConfig }: SwitchControlRendererProps<TFieldValues, TName>) {
  return (
    <Switch
      checked={field.value as boolean | undefined} // 确保值为 boolean
      onCheckedChange={(checked) => {
        field.onChange(checked as PathValue<TFieldValues, TName>);
        if (fieldConfig.onChange) {
          fieldConfig.onChange(checked);
        }
      }}
      disabled={fieldConfig.disabled}
    />
  );
}
