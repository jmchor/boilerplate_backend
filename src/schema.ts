import gql from 'graphql-tag';

// test stuff
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

export default typeDefs;
