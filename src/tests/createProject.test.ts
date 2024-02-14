import { test, assert } from 'vitest';
import { connectToMongoDB } from '../db';
import User from '../models/User';
import { Packages } from '../types/packages';

test('Test creating a project', async () => {
	try {
		// Connect to MongoDB
		await connectToMongoDB();

		// Find the user "Johannes"
		const user = await User.findOne({ username: 'Johannes' });

		// If user not found, log an error and fail the test
		if (!user) {
			console.error("User 'Johannes' not found.");
			assert(false); // fail the test
		}

		// Define project data
		const projectData = {
			title: 'The Quest for Love',
			description:
				"Hark, ye noble souls! Behold, 'The Quest for Love' - a wondrous endeavor where knights and maidens seeketh companionship and kindred spirits. In this gallant realm, hearts shalt entwine amidst chivalrous feats and courtly dances. With swords sheathed and banners unfurled, join us on a journey through the medieval countryside, where love's fair flame doth burn brightest.",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			createdBy: user._id, // assuming user._id is the ID of the user 'Johannes'
			frontend: {
				framework: ['react-ts'],
				dataLayer: ['graphql-client'],
				packages: [
					Packages.APOLLO_CLIENT,
					Packages.GRAPHQL,
					Packages.TSX,
					Packages.TSUP,
					Packages.NODEMON,
					Packages.NODEMON_TYPE,
				],
			},
			backend: {
				framework: ['node-ts'],
				dataLayer: ['graphql-server'],
				moduleType: ['module'],
				packages: [
					Packages.JWT,
					Packages.CORS,
					Packages.BCRYPTJS,
					Packages.TSX,
					Packages.DOTENV,
				],
				database: ['mongodb'],
			},
		};

		// Create project
		const createdProject = await createProject(projectData);

		// Check if project was created successfully
		assert(createdProject !== null);
	} catch (error) {
		console.error('Error occurred during test:', error);
		assert(false); // fail the test
	}
});
