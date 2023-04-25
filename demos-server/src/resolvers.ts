import {
	people as peopleData,
	movies as moviesData,
	moviesPeople as moviesPeopleData,
	Job
} from './data/all-data-typed.js';
import type { Person, Resolvers } from './generated/graphql.js';

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers: Resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		movies: () => {
			return moviesData;
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
