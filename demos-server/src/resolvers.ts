import _ from 'lodash';
import {
	people as peopleData,
	movies as moviesData,
	moviesPeople as moviesPeopleData,
	Job
} from './data/all-data-typed.js';
import type { Movie, Person, Resolvers } from './generated/graphql.js';

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers: Resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		movies: (parent, args) => {
			// if (args.filter !== undefined && args.filter !== null) {
			if (!args.filter) {
				return moviesData;
			} else {
				if (!args) return moviesData;
				/* Should we short-circuit this way? */
				/*
				if (args.filter?.id) {
					return moviesData.filter(m => m.id === args.filter?.id);
				}
				*/
				let { genre, ...singlePropsCriteria } = args.filter;
				console.log('filter:', singlePropsCriteria);

				// @types/lodash does not handle all Partial<> objects well, thus the assertion
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
				let filteredMovies = _.filter(moviesData, singlePropsCriteria) as Movie[];
				if (args.filter?.genre) {
					filteredMovies = filteredMovies.filter(
						m => m.genres.includes(args.filter?.genre as string)
					);
				}
				return filteredMovies;
			}
		},
		actors: () => {
			let mps = moviesPeopleData.filter(mp => mp.job === Job.ACTOR)
				.map(mp => mp.id);
			return peopleData.filter(p => mps.includes(p.id));
		},
	},
	Person: {
		movies: (parent) => {
			let movieIds = moviesPeopleData.filter(mp => {
				return mp.personId === parent.id;
			})
				.map(mp => mp.movieId);

			let personMovies = moviesData.filter(m => movieIds.includes(m.id));
			return personMovies;
		},
	},
	Movie: {
		actors: (parent) => getMoviePeopleByJob(parent.id, Job.ACTOR),
		directors: (parent) => getMoviePeopleByJob(parent.id, Job.DIRECTOR),
		writers: (parent) => getMoviePeopleByJob(parent.id, Job.WRITER),
	},
};

function getMoviePeopleByJob(movieId: number, job: Job): Person[] {
	let peopleIds = moviesPeopleData.filter(mp => mp.job === job && mp.movieId === movieId)
		.map(mp => mp.personId);
	return peopleData.filter(p => peopleIds.includes(p.id));
}

// let query: QueryResolvers;
