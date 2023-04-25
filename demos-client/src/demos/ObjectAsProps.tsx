import { type Movie } from '../data/all-data-typed';

// <MovieDetail movie={raiders} />
export default function ObjectAsProps() {
	let raiders: Movie = {
		id: 1,
		title: 'Raiders of the Lost Ark',
		year: 1981,
		directors: ['Stephen Spielberg'],
		writers: [
			'Lawrence Kasdan',
			'George Lucas',
			'Philip Kaufman',
		],
		rating: 5,
		genres: [
			'action',
			'adventure',
			'supernatural',
		],
	};
	return <MovieDetails movie={raiders} />;
}

// Exported so SelectableMovieDetails can use it
export interface MovieDetailsProps {
	movie: Movie;
}

export function MovieDetails(props: MovieDetailsProps) {
	let {
		title, year, directors, writers, rating, genres,
	} = props.movie;

	return (
		<ul>
			<li>Title: {title}</li>
			<li>Year: {year}</li>
			<li>Director: {Array.isArray(directors) ? directors.join(', ') : directors}</li>
			{/* Arrays have a join method that converts them to a string */}
			<li>Writers: {writers.join(', ')}</li>
			<li>Rating: {rating}</li>
			<li>Genres: {genres.join(', ')}</li>
		</ul>
	);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MovieDetailsStructured(props: MovieDetailsProps) {
	return (
		<ul>
			<li>Title: {props.movie.title}</li>
			<li>Year: {props.movie.year}</li>
			<li>Director: {props.movie.directors}</li>
			<li>Writers: {props.movie.writers}</li>
			<li>Rating: {props.movie.rating}</li>
			<li>Genres: {props.movie.genres}</li>
		</ul>
	);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MovieDetailsDestructured({ movie: {
	title, year, directors, writers, rating, genres,
} }: MovieDetailsProps) {
	return (
		<ul>
			<li>Title: {title}</li>
			<li>Year: {year}</li>
			<li>Director: {directors}</li>
			<li>Writers: {writers}</li>
			<li>Rating: {rating}</li>
			<li>Genres: {genres}</li>
		</ul>
	);
}
