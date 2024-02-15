import { GraphQLError } from 'graphql';
import { Project, Resolvers } from './types.js';
// // This is resolvers.ts
// import jwt from 'jsonwebtoken';

import ProjectModel from './models/Project.js';
import { generateInstallCommands } from './scripts/installCommands.js';

// // testresolvers
// const books = [
// 	{
// 		title: 'The Awakening',
// 		author: 'Kate Chopin',
// 	},
// 	{
// 		title: 'City of Glass',
// 		author: 'Paul Auster',
// 	},
// ];
const resolvers: Resolvers = {
	Query: {
		// books: () => books,
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

				const newProject = new ProjectModel(newProjectData);
				await newProject.save();
				return newProject;
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
			console.log('HERE WE ARE!', args);
			try {
				// Check if _id is valid (you might want to add more validation here)
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

				// const returnableProject: Project = {
				// 	backend: updatedProject?.backend,
				// 	createdBy: updatedProject?.createdBy,
				// 	description: updatedProject?.description,
				// 	frontend: updatedProject?.frontend,
				// 	kanban: updatedProject?.kanban,
				// 	installScripts: updatedProject?.installScripts,
				// 	title: updatedProject?.title,
				// };

				return updatedProject;
			} catch (error) {
				console.error('Error adding install script:', error.message);
				throw error;
			}
		},
	},
};

export default resolvers;
