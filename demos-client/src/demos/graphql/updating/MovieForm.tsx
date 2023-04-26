import { useQuery } from '@apollo/client';
import type { Movie } from '../../../generated/graphql';
import { type MoviesPayload } from '../../demos-types';
import { QUERY_MOVIE_BY_ID } from '../graphql-queries';

interface MovieFormProps {
	submitAction?: (movie: Movie) => void;
	movieToEdit?: Movie;
	formLabel?: string;
	submitButtonLabel?: string;
}

export default function MovieForm({
	submitAction,
	movieToEdit,
	formLabel,
	submitButtonLabel,
}: MovieFormProps) {
	let handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		if (!submitAction) return true;
		event.preventDefault();
		let fd = new FormData(event.currentTarget);
		let movie: Partial<Movie> = {};

		let id = fd.get('id');
		if (id && !(id instanceof File)) movie.id = Number(id);

		let title = fd.get('title');
		if (title && !(title instanceof File)) movie.title = title;

		let year = fd.get('year');
		if (year && !(year instanceof File)) movie.year = Number(year);

		let rating = fd.get('rating');
		if (rating && !(rating instanceof File)) movie.rating = Number(rating);

		let genres = fd.get('genres');
		if (genres && !(genres instanceof File)) movie.genres = genres.split(/,\s*/);

		let validMovie: Movie = {
			id: movie.id ?? -1,
			title: movie.title ?? '',
			year: movie.year ?? -1,
			rating: movie.rating ?? -1,
			genres: movie.genres ?? [],
		};

		submitAction(validMovie);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<h4>{formLabel ?? 'Movie Form'}</h4>
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
					defaultValue={movieToEdit?.title ?? ''}
					key={movieToEdit?.title}
					required
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
					defaultValue={movieToEdit?.year ?? ''}
					key={movieToEdit?.year}
					required
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
					defaultValue={movieToEdit?.rating ?? ''}
					key={movieToEdit?.rating}
					required
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
					defaultValue={movieToEdit?.genres.join(', ') ?? ''}
					key={movieToEdit?.genres.join(', ')}
					required
				/>
			</div>
			{/* Commented out because the use pattern is complex */}
			{/*
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
					defaultValue={getPeople(movieToEdit?.directors) ?? ''}
					key={getPeople(movieToEdit?.}

					required
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
					defaultValue={getPeople(movieToEdit?.writers) ?? ''}
					key={getPeople(movieToEdit?.}

					required
				/>
			</div>
			 */}
			{movieToEdit?.id && (
				<input
					type="hidden"
					name="id"
					defaultValue={movieToEdit.id}
					key={movieToEdit.id}
				/>
			)}
			<div className="mt-2">
				<button
					className="btn btn-danger"
					type="submit"
				>
					{submitButtonLabel ?? 'Submit'}
				</button>
			</div>
		</form>
	);
}

type EditMovieFormProps = Omit<MovieFormProps, 'movieToEdit'> & { movieId?: number };
export function EditMovieForm({ movieId, ...props }: EditMovieFormProps) {
	const { loading, data } = useQuery<MoviesPayload>(QUERY_MOVIE_BY_ID, {
		variables: { filter: { id: movieId } },
		skip: !movieId,
		pollInterval: 1000,
	});

	console.log('EditMovieForm reloaded');
	if (loading) return <p>Loading...</p>;
	if (data) {
		return (
			<MovieForm
				{...props}
				movieToEdit={data.movies[0]}
			/>
		);
	}
	return null;
}
