import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { type Movie } from '../../data/all-data-typed';

const GET_MOVIES = gql`
	query GetMovies {
		movies {
			title
			year
			rating
			directors
			id
		}
	}
`;

export default function ApolloGraphql() {
	return (
		<section>
			<h4>Apollo and graphQL</h4>
			<RenderGraphql />
		</section>
	);
}

export function RenderGraphql() {
	const {
		loading, error, data,
	} = useQuery<{ movies: Array<Partial<Movie>> }>(GET_MOVIES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	if (!data) return <span>No requests made.</span>;

	return (
		<ul>
			{data.movies.map((movie) => {
				return <li key={movie.id}>{movie.title}</li>;
			})}
		</ul>
	);
}
