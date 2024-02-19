import { startStandaloneServer } from '@apollo/server/standalone';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import { ApolloServer } from '@apollo/server';
import typeDefs from './schema'; // Assuming typeDefs and resolvers are imported from other files
import resolvers from './resolvers';
import { UserModel } from './models/User.model';
import { connectToMongoDB } from './db';
import { User } from './types';

interface AuthHeaders {
	authorization?: string;
}

interface RequestContext {
	req: {
		headers: AuthHeaders;
	};
}

function getAuthToken(req: RequestContext['req']): string | undefined {
	return req.headers.authorization;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

async function startServer() {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		context: async ({ req }: RequestContext) => {
			const auth = getAuthToken(req);
			if (auth && auth.startsWith('Bearer ')) {
				const decodedToken = jwt.verify(
					auth.substring(7),
					process.env.JWT_SECRET
				) as JwtPayload;

				const currentUser: User = await UserModel.findById(decodedToken.userId); // Assuming User.findById returns a Promise

				return { currentUser };
			}
		},
	});

	void connectToMongoDB();

	console.log(`
    📊 Connected to MongoDB
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startServer().catch((error) => {
	console.error('Error starting server:', error);
});
