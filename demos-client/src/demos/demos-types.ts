export type SortDirection = 'asc' | 'desc' | undefined;
export interface SortConfig {
	sortColumn: string | undefined;
	sortDirection: SortDirection;
}

export interface ColumnConfig<T> {
	field: keyof T;
	label: string;
}
