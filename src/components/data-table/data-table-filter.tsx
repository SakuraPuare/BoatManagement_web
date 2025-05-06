import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeRangePicker } from "@/components/ui/time-range-picker";
import { Filter, TimeRange } from "@/types";
import { Search } from "lucide-react";
import React from "react";

interface DataTableFilterProps<T> {
  filter?: Filter<T>;
  onFilterChange: (newFilter: Filter<T>) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  hasTimeColumns: boolean;
}

export function DataTableFilter<T>({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  timeRange,
  onTimeRangeChange,
  hasTimeColumns,
}: DataTableFilterProps<T>) {
  /**
   * 处理筛选下拉框选项变化
   * @param optionId 筛选字段的 ID (对应数据类型 T 的 key)
   * @param value 选中的值
   */
  const handleFilterOptionChange = (
    optionId: keyof T | string, // 允许字符串类型的 key
    value: string | T[keyof T] // 值可以是 'all' 或具体类型的值
  ) => {
    if (!filter) return;

    const newFilter = { ...filter, filter: { ...filter.filter } }; // 深拷贝 filter

    // 如果选择 "all"，则从 filter 中删除该字段
    if (value === "all") {
      delete newFilter.filter[optionId as keyof T];
    } else {
      // 否则更新 filter 中对应字段的值
      newFilter.filter[optionId as keyof T] = value as T[keyof T];
    }

    onFilterChange(newFilter);
  };

  return (
    <div className="flex flex-row items-center gap-2 flex-wrap ">
      {/* 搜索框 */}
      <div className="flex items-center gap-1 w-96">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          placeholder="搜索..."
          className="max-w-7xl" // 限制最大宽度
          value={searchTerm} // 使用 value 使其受控
          onChange={onSearchChange} // 更新内部状态并触发防抖回调
        />
      </div>

      <div className="grow"></div>

      {/* 筛选选项下拉框 */}
      <div className="flex flex-row gap-2 flex-wrap">
        {filter?.filterOptions?.map((option) => (
          <div key={String(option.id)} className="min-w-[150px]">
            {" "}
            {/* 保证最小宽度 */}
            <Select
              onValueChange={(value) =>
                handleFilterOptionChange(option.id, value)
              }
              // 将 defaultValue 改为 value
              value={
                filter?.filter?.[option.id as keyof T]
                  ? String(filter.filter[option.id as keyof T])
                  : "all"
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={option.placeholder || `${option.label} 筛选`}
                />
              </SelectTrigger>
              <SelectContent>
                {/* "全部" 选项 */}
                <SelectItem value="all">{option.label} 全部</SelectItem>
                {/* 渲染具体筛选选项 */}
                {option.options.map((selection) => (
                  <SelectItem key={selection.value} value={selection.value}>
                    {selection.label} {/* 显示选项标签 */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* 时间范围选择器，仅在存在时间列时显示 */}
      {hasTimeColumns && (
        <TimeRangePicker
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
        />
      )}
    </div>
  );
}
