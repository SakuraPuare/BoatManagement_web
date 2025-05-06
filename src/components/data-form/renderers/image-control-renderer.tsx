import React from "react";
import Image from "next/image";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FieldConfig } from "../types";

interface ImageControlRendererProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldConfig: FieldConfig;
  fieldKey: string;
}

export function ImageControlRenderer<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  fieldConfig,
  fieldKey,
}: ImageControlRendererProps<TFieldValues, TName>) {
  return (
    <Image
      src={(field.value as string | undefined) || "/placeholder.png"}
      alt={fieldConfig.alt || `Image for ${fieldKey}`}
      width={fieldConfig.width || 100}
      height={fieldConfig.height || 100}
      className="rounded border object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.png";
      }}
    />
  );
}
