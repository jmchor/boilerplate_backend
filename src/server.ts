import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { connectToMongoDB } from './db.js';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { UserModel } from './models/User.model.js';
import { ReqWithUserAndCookies } from './types/argTypes.js';

config();

const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';

console.log(`ORIGIN: ${ORIGIN}`);
async function startServer() {
	const app = express();

	app.use(cookieParser());

	const corsOptions = {
		origin: ORIGIN,
		credentials: true,
	};

	app.use(cors(corsOptions));

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	app.use(async (req: ReqWithUserAndCookies, res: Response, next) => {
		try {
			// Check if token is present in the cookies

			const { token } = req.cookies as { token?: string };

			if (token) {
				// Token is present, proceed with decoding and retrieving the current user

				const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
				const currentUser = await UserModel.findById(decodedToken.userId);
				req.currentUser = currentUser;
			}
		} catch (error) {
			console.error('Error verifying JWT token:', error);
		} finally {
			next(); // Proceed to the next middleware or route handler
		}
	});

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
	});

	await server.start();
	server.applyMiddleware({ app, path: '/graphql', cors: false });

	await connectToMongoDB();

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	});
}

startServer().catch((error) => {
	console.error('Error starting server:', error);
});
