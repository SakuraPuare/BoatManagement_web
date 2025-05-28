import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { FieldConfig } from "../types";

interface CheckboxControlRendererProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldConfig: FieldConfig;
}

export function CheckboxControlRenderer<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({ field, fieldConfig }: CheckboxControlRendererProps<TFieldValues, TName>) {
  return (
    <Checkbox
      checked={field.value as boolean | "indeterminate" | undefined}
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
