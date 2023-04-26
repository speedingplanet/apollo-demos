import { gql } from '@apollo/client';

export const GET_MOVIE_TITLES = gql`
	query GetMovieTitles {
		movies {
			title
			id
		}
	}
`;

export const QUERY_MOVIES_BY_GENRE = gql`
	query QueryMoviesByGenre($filter: MovieFilterInput) {
		movies(filter: $filter) {
			id
			title
			genres
		}
	}
`;

export const QUERY_MOVIE_BY_ID = gql`
	query QueryMoviesById($filter: MovieFilterInput) {
		movies(filter: $filter) {
			title
			year
			rating
			genres
			id
		}
	}
`;

export const UPDATE_MOVIE = gql`
	mutation Mutation($id: Int!, $movie: MovieInput!) {
		updateMovie(id: $id, movie: $movie) {
			id
			title
			year
			rating
			genres
		}
	}
`;
