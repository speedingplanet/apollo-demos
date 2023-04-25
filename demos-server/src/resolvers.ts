import { actors as actorsData,
	movies as moviesData,
	moviesActors as moviesActorsData } from './data/all-data-typed.js';
import type { Resolvers } from './generated/graphql.js';

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers: Resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		movies: () => {
			return moviesData;
		},
		actors: () => {
			return actorsData;
		},
	},
	Actor: {
		movies: (parent) => {
			let movieIds = moviesActorsData.filter(ma => ma.actorId === parent.id)
				.map(ma => ma.movieId);
			let actorMovies = moviesData.filter(m => movieIds.includes(m.id));
			return actorMovies;
		},
	},
	Movie: {
		actors: (parent) => {
			let actorIds = moviesActorsData.filter(ma => ma.movieId === parent.id)
				.map(ma => ma.actorId);
			let movieActors = actorsData.filter(a => actorIds.includes(a.id));
			return movieActors;
		},
	},
};

// let query: QueryResolvers;
