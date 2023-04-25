import React from 'react';
import { FullFormControlled, type MovieWithoutId } from '../FullForm';
import { type Movie } from '../../data/all-data-typed';
import { gql, useMutation } from '@apollo/client';
import { SelectableMovieDetails } from '../SelectableMovieDetails';

let ADD_MOVIE = gql`
	mutation AddMovie($movie: NewMovie!) {
		addMovie(movie: $movie) {
			id
			title
		}
	}
`;

export default function AddingMoviesWithGraphQL() {
	const [addMovie, { data }] = useMutation(ADD_MOVIE);

	let handleSubmitAction = async (movie: MovieWithoutId) => {
		console.log('adding movie:', movie);
		await addMovie({ variables: { movie } });
	};

	return (
		<section className="row">
			<div className="col">
				<FullFormControlled
					submitAction={handleSubmitAction}
					submitButtonLabel="Add movie"
					formLabel="Adding a movie"
				/>
			</div>
			<div className="col"><MovieDetailsWrapper movie={data?.addMovie} /></div>
		</section>
	);
}

interface MovieDetailsWrapperProps {
	movie?: Movie;
}

function MovieDetailsWrapper({ movie }: MovieDetailsWrapperProps) {
	if (!movie) {
		return <p></p>;
	} else {
		return <SelectableMovieDetails movie={movie} showFields={['id', 'title']} />;
	};
}
