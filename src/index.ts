/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// This is index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers';
import typeDefs from './schema';

async function startApolloServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		// context: async ({ req }) => {
		// 	//   if (!req || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
		// 	//     return {};
		// 	//   }

		// 	//   const token = req.headers.authorization.split(' ')[1];
		// 	//   try {
		// 	//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		// 	//     const currentUser = await User.findById(decodedToken.id);
		// 	//     return { currentUser };
		// 	//   } catch (error) {
		// 	//     return {};
		// 	//   }
		// },
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

await startApolloServer();
