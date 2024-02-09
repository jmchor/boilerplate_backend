// // This is resolvers.ts
// import { GraphQLError } from 'graphql';
// import jwt from 'jsonwebtoken';

import { Resolvers } from './types';

// testresolvers
const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];
const resolvers: Resolvers = {
	Query: {
		books: () => books,
	},
};

export default resolvers;
