/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		myCustomQuery: () => 'Hello, world, from myCustomQuery',
	},
};
