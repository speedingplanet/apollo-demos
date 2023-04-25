import { movies } from './data/all-data-typed.js';

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		movies: () => {
			return movies;
		},
	},
};
