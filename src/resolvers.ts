import { GraphQLError } from 'graphql';
import { Project, Resolvers } from './types';
// // This is resolvers.ts
// import jwt from 'jsonwebtoken';

import ProjectModel from './models/Project';
import { generateInstallCommands } from './scripts/installCommands';

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

	Mutation: {
		createProject: async (root, args): Promise<Project> => {
			const { title, description, createdBy, frontend, backend } = args;

			try {
				const existingProject = await ProjectModel.findOne({ title });

				if (existingProject) {
					throw new GraphQLError(`Project with title ${title} already exists`);
				}

				const newProjectData = {
					title,
					description,
					createdBy,
					frontend: {
						...frontend,
					},
					backend: {
						...backend,
					},
				};

				await new ProjectModel(newProjectData).save();

				return newProjectData;
			} catch (error: unknown) {
				throw new GraphQLError(`Failed to create project:`, {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: args,
						error,
					},
				});
			}
		},
		addInstallScript: async (root, args: { _id: string }): Promise<Project> => {
			try {
				if (!args) {
					throw new Error('Invalid project ID');
				}

				const projectToUpdate = await generateInstallCommands(args._id);
				const {
					installScripts,
					frontend: { packages: frontendPackages },
					backend: { packages: backendPackages },
				} = projectToUpdate;

				const updatedProject = await ProjectModel.findByIdAndUpdate(
					args._id,
					{
						installScripts,
						frontend: { packages: frontendPackages },
						backend: { packages: backendPackages },
					},
					{ new: true }
				);

				const mutationReturn: Project = {
					backend: updatedProject?.backend,
					createdBy: updatedProject?.createdBy as string,
					description: updatedProject?.description,
					frontend: updatedProject?.frontend,
					installScripts: updatedProject?.installScripts,
					title: updatedProject?.title,
				};

				return mutationReturn;
			} catch (error) {
				console.error('Error adding install script:', error.message);
				throw error;
			}
		},
	},
};

export default resolvers;
