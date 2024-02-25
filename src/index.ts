import { ApolloServer } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { User } from './types';
import { connectToMongoDB } from './db';
import typeDefs from './schema';
import resolvers from './resolvers';
import { UserModel } from './models/User.model';

interface ReqWithUser extends Request {
	currentUser?: User;
}

async function startServer() {
	const app = express();

	app.use(cookieParser());

	const corsOptions = {
		origin: 'http://localhost:5173',
		credentials: true,
	};

	app.use(cors(corsOptions));

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	app.use(async (req: ReqWithUser, res: Response, next) => {
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
	server.applyMiddleware({ app, path: '/graphql' });

	await connectToMongoDB();

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	});
}

startServer().catch((error) => {
	console.error('Error starting server:', error);
});
