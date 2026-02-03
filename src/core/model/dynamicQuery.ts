export interface FilterField {
  label: string;
  value: string;
  type?: 'string' | 'date' | 'number' | 'enum';
}

export interface FilterItem {
  field?: string;
  operator?: string;
  value?: string;
  from?: string;
  to?: string;
}

export interface SortItem {
  field: string;
  dir: string;
}

export interface Filter {
  field?: string;
  operator?: string;
  value?: string;
  logic?: string;
  caseSensitive?: boolean;
  filters?: FilterItem[];
}

export interface DynamicQuery {
  sort: SortItem[] | null;
  filter: Filter | null;
}
