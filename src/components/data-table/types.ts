interface Page {
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalRow?: number;
}

interface Filter<T> {
  filter: {
    [key in keyof T]?: T[key];
  };
  filterOptions: {
    id: keyof T;
    label: string;
    placeholder?: React.ReactNode;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  search: string | null;
  sort: string | null;
  startDateTime: string | null;
  endDateTime: string | null;
}

interface TimeRange {
  startDateTime?: Date; // 开始日期时间
  endDateTime?: Date; // 结束日期时间
}
