/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const resolvers = {
	Query: {
		hello: (_, { name }: { name: string }) => `Hello ${name}!`,
		myCustomQuery: (parent, args) => {
			let timeGreeting = 'day';
			if (args.timeOfDay < 12) {
				timeGreeting = 'morning';
			} else if (args.timeOfDay >= 12 && args.timeOfDay < 18) {
				timeGreeting = 'afternoon';
			} else if (args.timeOfDay > 18) {
				timeGreeting = 'evening';
			}
			return `Good ${timeGreeting} from myCustomQuery`;
		},
	},
};
