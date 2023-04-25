import './demos.css';
import { type Movie } from '../data/all-data-typed';
import type { ColumnConfig } from './demos-types';

export interface MovieTableProps {
	movies: Movie[];
	columns: Array<ColumnConfig<Movie>>;
}

export default function MovieTable({ movies, columns }: MovieTableProps) {
	return (
		// Dynamically resizes the columns in the table according to the number of columns in the dataset
		<div className={`movie-container mc-${columns.length}`}>
			<MovieHeaders columns={columns} />
			<MovieBody
				columns={columns}
				movies={movies}
			/>
		</div>
	);
}

export function MovieHeaders({ columns }: Pick<MovieTableProps, 'columns'>) {
	return (
		<>
			{columns.map((c) => (
				<div
					className="movie-headers"
					key={c.field}
				>
					{c.label}
				</div>
			))}
		</>
	);
}

export function MovieBody({ movies, columns }: MovieTableProps) {
	return (
		<>
			{movies.map((movie) => (
				<MovieRow
					key={movie.id}
					movie={movie}
					fields={columns.map((c) => c.field)}
				/>
			))}
		</>
	);
}

interface MovieRowProps {
	movie: Movie;
	fields: Array<keyof Movie>;
}

export function MovieRow({ movie, fields }: MovieRowProps) {
	return (
		<>
			{fields.map((field) => (
				<div
					data-testid={`movie-${field}-${movie.id}`}
					className="movie-row"
					key={field}
				>
					{movie[field]}
				</div>
			))}
		</>
	);
}
