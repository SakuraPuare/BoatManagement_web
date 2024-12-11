"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface DateRange {
  from?: Date
  to?: Date
}

interface DatePickerWithRangeProps {
  className?: string
  value: DateRange | undefined
  onChange: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "yyyy-MM-dd")} -{" "}
                  {format(value.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(value.from, "yyyy-MM-dd")
              )
            ) : (
              <span>选择日期范围</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
} 