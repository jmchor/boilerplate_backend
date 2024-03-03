import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		if (typeof value === 'number') {
			// If the value is a number (timestamp), convert it to a Date object
			return new Date(value);
		}
		if (value instanceof Date) {
			// If the value is already a Date object, return it as is
			return value;
		}
		throw new Error('Invalid date value');
	},
	parseValue(value) {
		if (typeof value === 'number') {
			return new Date(value); // Convert incoming integer to Date
		}
		throw new Error('GraphQL Date Scalar parser expected a `number`');
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			// Convert hard-coded AST string to integer and then to Date
			return new Date(parseInt(ast.value, 10));
		}
		// Invalid hard-coded value (not an integer)
		return null;
	},
});

export default dateScalar;
