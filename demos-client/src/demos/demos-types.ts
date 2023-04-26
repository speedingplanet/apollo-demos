import { type Movie } from '../generated/graphql';

export type SortDirection = 'asc' | 'desc' | undefined;
export interface SortConfig {
	sortColumn: string | undefined;
	sortDirection: SortDirection;
}

export interface ColumnConfig<T> {
	field: keyof T;
	label: string;
}

export interface MoviesPayload {
	movies: Movie[];
}

export interface UpdateMoviesPayload {
	updateMovie: Movie;
}
