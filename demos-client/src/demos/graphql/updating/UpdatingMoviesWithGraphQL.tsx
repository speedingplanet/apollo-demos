import { useMutation } from '@apollo/client';
import { UPDATE_MOVIE } from '../graphql-queries';
import { PickMovieByTitle } from './PickMovieByTitle';
import { EditMovieForm } from './MovieForm';
import type { Movie } from '../../../generated/graphql';
import { useState } from 'react';
import { AsyncMovieDetails } from './MovieDetails';
import { type MoviesPayload } from '../../demos-types';

export default function UpdatingMoviesWithGraphQL() {
	const [movieToEditId, setMovieToEditId] = useState<number | undefined>();
	const [updateMovie, mutationResults] = useMutation<MoviesPayload>(UPDATE_MOVIE);

	const handleSubmitAction = async (formMovie: Movie) => {
		await updateMovie({
			variables: {
				id: movieToEditId,
				movie: formMovie,
			},
		});
	};

	return (
		<section className="row">
			<div className="col">
				<PickMovieByTitle pickMovie={setMovieToEditId} />
				<EditMovieForm
					movieId={movieToEditId}
					submitAction={handleSubmitAction}
					submitButtonLabel="Update movie"
					formLabel="Updating a movie"
				/>
			</div>
			<div className="col">
				<AsyncMovieDetails {...mutationResults} />
			</div>
		</section>
	);
}
