// // This is resolvers.ts
// import { GraphQLError } from 'graphql';
// import jwt from 'jsonwebtoken';

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
const resolvers = {
	Query: {
		books: () => books,
	},
};

export default resolvers;
