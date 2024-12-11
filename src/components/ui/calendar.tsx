"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  mode?: "single" | "range"
  selected?: { from?: Date; to?: Date }
  onSelect?: (range: { from?: Date; to?: Date }) => void
  className?: string
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => addMonths(prev, -1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }

  const handleSelectDate = (date: Date) => {
    if (!onSelect) return

    if (mode === "single") {
      onSelect({ from: date })
      return
    }

    if (!selected?.from) {
      onSelect({ from: date })
    } else if (!selected.to && date > selected.from) {
      onSelect({ from: selected.from, to: date })
    } else {
      onSelect({ from: date })
    }
  }

  const isSelected = (date: Date) => {
    if (!selected?.from) return false
    if (mode === "single") return selected.from.getTime() === date.getTime()
    return (
      date.getTime() === selected.from.getTime() ||
      (selected.to && date.getTime() === selected.to.getTime()) ||
      (selected.to && date > selected.from && date < selected.to)
    )
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {days.map((date, i) => (
          <Button
            key={i}
            variant="ghost"
            className={cn(
              "h-9 w-9 p-0 font-normal",
              isSelected(date) && "bg-primary text-primary-foreground"
            )}
            onClick={() => handleSelectDate(date)}
          >
            {format(date, "d")}
          </Button>
        ))}
      </div>
    </div>
  )
}
