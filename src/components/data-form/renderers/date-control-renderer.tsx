import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FieldConfig } from "../types";

interface DateControlRendererProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldConfig: FieldConfig;
}

export function DateControlRenderer<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({ field, fieldConfig }: DateControlRendererProps<TFieldValues, TName>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "PPP")
          ) : (
            <span>{fieldConfig.placeholder || "选择日期"}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date < new Date() || date > new Date("2025-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
