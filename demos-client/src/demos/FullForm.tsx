import type React from 'react';
import { type Movie, movies } from '../data/all-data-typed';
import { useState } from 'react';

export default function FullForm() {
	return (
		<section className="row">
			<div className="col">
				<FullFormUncontrolled />
			</div>
			<div className="col">
				<FullFormControlled />
			</div>
		</section>
	);
}

// Dark TypeScript magic from https://stackoverflow.com/a/60932900
// Record type ensures, we have no double or missing keys, values can be neglected
function createKeys(keyRecord: Record<keyof Movie, any>): Array<keyof Movie> {
	return Object.keys(keyRecord) as any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys = createKeys(movies[1]);

export function FullFormUncontrolled() {
	let handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		let form = event.currentTarget;
		let data = new FormData(form);
		let movie: Partial<Movie> = {};

		/*
		for (let [key, value] of data.entries() as IterableIterator<[keyof Movie, string]>) {
			if (['rating', 'year'].includes(key)) {
				movie[key] = Number(value);
			} else if (['genres', 'writer'].includes(key)) {
				movie[key] = [value];
			} else {
				movie[key] = value;
			}
		}
		*/

		movie.title = data.get('title') as string;
		movie.directors = [data.get('director') as string];
		movie.writers = [data.get('writer') as string];
		movie.genres = [data.get('genres') as string];
		movie.year = Number(data.get('year') as string);
		movie.rating = Number(data.get('title') as string);
		movie.id = Date.now(); // Large but reasonably unique

		console.log('Adding a movie:', movie);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<h4>Uncontrolled Movie Form</h4>
			</div>
			<div>
				<label
					htmlFor="movie-title"
					className="form-label"
				>
					Title
				</label>
				<input
					type="text"
					name="title"
					id="movie-title"
					className="form-control"
				/>
			</div>
			<div>
				<label
					htmlFor="movie-year"
					className="form-label"
				>
					Year
				</label>
				<input
					type="text"
					name="year"
					id="movie-year"
					className="form-control"
				/>
			</div>
			<div>
				<label
					htmlFor="movie-director"
					className="form-label"
				>
					Director
				</label>
				<input
					type="text"
					name="director"
					id="movie-director"
					className="form-control"
				/>
			</div>
			<div>
				<label
					htmlFor="movie-writer"
					className="form-label"
				>
					Writer
				</label>
				<input
					type="text"
					name="writer"
					id="movie-writer"
					className="form-control"
				/>
			</div>
			<div>
				<label
					htmlFor="movie-rating"
					className="form-label"
				>
					Rating
				</label>
				<input
					type="text"
					name="rating"
					id="movie-rating"
					className="form-control"
				/>
			</div>
			<div>
				<label
					htmlFor="movie-genres"
					className="form-label"
				>
					Genres
				</label>
				<input
					type="text"
					name="genres"
					id="movie-genres"
					className="form-control"
				/>
			</div>
			<div className="mt-2">
				<button
					className="btn btn-primary"
					type="submit"
				>
					Uncontrolled
				</button>
			</div>
		</form>
	);
}

/*
 * Movie has id, director, writers, etc....
 * We don't want the id field, so MovieWithoutId = Omit<Movie, 'id'>
 * But, we also want to build a Movie as the user enters data.
 * MovieWithoutId requires an object with {title: '...', director: '...', etc}
 * So let's make those fields optional: OptionalMovieWithoutId = Partial<MovieWithoutId>
 * Now every field on MovieWithoutId is optional (can be skipped if we want)
 * {} is a value OptionalMovieWithoutId
 * {title: 'Star Wars'} is a value OptionalMovieWithoutId
 * {director: 'George Lucas', genres: ['sci fi']} is a value OptionalMovieWithoutId
 * {rating: 3, year: 2022, title: 'Whatever'} is a value OptionalMovieWithoutId
 *
 */
export type MovieWithoutId = Partial<Omit<Movie, 'id'>>;
interface FullFormControlledProps {
	submitAction?: (movie: MovieWithoutId) => void;
	submitButtonLabel?: string;
	formLabel?: string;
	movieToEdit?: Movie;
}

export function FullFormControlled({
	submitAction,
	submitButtonLabel,
	formLabel,
	movieToEdit,
}: FullFormControlledProps) {
	let [movie, setMovie] = useState<MovieWithoutId>({});

	let updateMovie: React.FormEventHandler<HTMLInputElement> = (event) => {
		let field = event.currentTarget.name;
		let value: string | string[] | number = event.currentTarget.value;

		if ([
			'directors', 'writers', 'genres',
		].includes(field)) {
			value = value.split(/,\s*/);
		} else if (['rating', 'year'].includes(field)) {
			value = Number(value);
		}

		setMovie({
			...movie,
			[field]: value,
		});
	};

	let handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (submitAction) submitAction(movie);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<h4>{formLabel ?? 'Controlled Movie Form'}</h4>
			</div>
			<div>
				<label
					htmlFor="movie-title"
					className="form-label"
				>
					Title
				</label>
				<input
					type="text"
					name="title"
					id="movie-title"
					className="form-control"
					// movie.title will be undefined at first which will throw an error
					// when we try to edit that field (uncontrolled -> controlled component)
					// Fall back to movieToEdit.title when movie.title is blank, which should
					// prevent errors and warnings
					value={movie.title ?? movieToEdit?.title ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div>
				<label
					htmlFor="movie-year"
					className="form-label"
				>
					Year
				</label>
				<input
					type="text"
					name="year"
					id="movie-year"
					className="form-control"
					value={movie.year ?? movieToEdit?.year ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div>
				<label
					htmlFor="movie-director"
					className="form-label"
				>
					Director
				</label>
				<input
					type="text"
					name="directors"
					id="movie-director"
					className="form-control"
					value={movie.directors ?? movieToEdit?.directors ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div>
				<label
					htmlFor="movie-writer"
					className="form-label"
				>
					Writer
				</label>
				<input
					type="text"
					name="writers"
					id="movie-writer"
					className="form-control"
					value={movie.writers ?? movieToEdit?.writers ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div>
				<label
					htmlFor="movie-rating"
					className="form-label"
				>
					Rating
				</label>
				<input
					type="text"
					name="rating"
					id="movie-rating"
					className="form-control"
					value={movie.rating ?? movieToEdit?.rating ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div>
				<label
					htmlFor="movie-genres"
					className="form-label"
				>
					Genres
				</label>
				<input
					type="text"
					name="genres"
					id="movie-genres"
					className="form-control"
					value={movie.genres ?? movieToEdit?.genres ?? ''}
					onChange={updateMovie}
				/>
			</div>
			<div className="mt-2">
				<button
					className="btn btn-danger"
					type="submit"
				>
					{submitButtonLabel ?? 'Controlled'}
				</button>
			</div>
		</form>
	);
}
