import { GraphQLError } from 'graphql';
import { genSaltSync, hashSync } from 'bcrypt-ts';

import { Article, Project, Resolvers, User } from './types.js';

// import jwt from 'jsonwebtoken';

import { generateInstallCommands } from './scripts/installCommands.js';
import { ProjectModel } from './models/Project.model.js';
import { ArticleModel } from './models/Article.model.js';
import { UserModel } from './models/User.model.js';
import { KanbanModel } from './models/Kanban.model.js';

const resolvers: Resolvers = {
	Query: {
		allProjects: async (): Promise<Project[]> => {
			const projects = await ProjectModel.find();

			if (!projects) {
				throw new GraphQLError('No projects found');
			}

			const populatedProjects = await Promise.all(
				projects.map(async (project) => {
					return project.populate({
						path: 'createdBy',
						model: UserModel,
					});
				})
			);

			return populatedProjects;
		},

		findProject: async (parent, { _id }): Promise<Project> => {
			const project = await ProjectModel.findById(_id);

			if (!project) {
				throw new GraphQLError('Project not found', {
					extensions: {
						code: 'NOT_FOUND',
						invalidArgs: _id,
					},
				});
			}
			console.log(project);

			return project.populate({
				path: 'createdBy',
				model: UserModel,
			});
		},
		allArticles: async (): Promise<Article[]> => {
			const articles = await ArticleModel.find();

			if (!articles) {
				throw new GraphQLError('No articles found');
			}

			const populatedArticles = await Promise.all(
				articles.map(async (article) => {
					return article.populate({
						path: 'createdBy',
						model: UserModel,
					});
				})
			);

			return populatedArticles;
		},
		findArticle: async (parent, { _id }): Promise<Article> => {
			const article = await ArticleModel.findById(_id);

			if (!article) {
				throw new GraphQLError('Article not found', {
					extensions: {
						code: 'NOT_FOUND',
						invalidArgs: _id,
					},
				});
			}

			return article.populate({
				path: 'createdBy',
				model: UserModel,
			});
		},
	},

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

	Mutation: {
		createProject: async (
			parent,
			{ title, description, createdBy, frontend, backend }
		): Promise<Project> => {
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

				const projectToUpdate = await generateInstallCommands(newProject._id);
				const {
					installScripts,
					frontend: { packages: frontendPackages },
					backend: { packages: backendPackages },
				} = projectToUpdate;

				const updatedProject = await ProjectModel.findByIdAndUpdate(
					newProject._id,
					{
						$set: {
							'frontend.packages': frontendPackages,
							'backend.packages': backendPackages,
							installScripts,
						},
					},
					{ new: true }
				);

				// create a new Kanban

				const newKanban = new KanbanModel({
					project: updatedProject._id,
					backlog: [],
					todo: [],
					doing: [],
					done: [],
				});

				await newKanban.save();

				// associate the new Kanban with the new project

				const addKanbanToProject = await ProjectModel.findByIdAndUpdate(
					updatedProject._id,
					{
						kanban: newKanban._id,
					},
					{ new: true }
				);

				const populatedProject = await ProjectModel.findById(updatedProject._id)
					.populate({
						path: 'createdBy',
						model: UserModel,
					})
					.populate({
						path: 'kanban',
						model: KanbanModel,
					});

				return populatedProject;
			} catch (error: unknown) {
				throw new GraphQLError(`Failed to create project:`, {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: title,
						description,
						createdBy,
						frontend,
						backend,
						error,
					},
				});
			}
		},
		addInstallScript: async (parent, { _id }): Promise<Project> => {
			try {
				// Check if _id is valid (you might want to add more validation here)
				if (!_id) {
					throw new GraphQLError('Invalid project ID', {
						extensions: {
							code: 'INVALID_INPUT',
							invalidArgs: _id,
						},
					});
				}

				const projectToUpdate = await generateInstallCommands(_id);
				const {
					installScripts,
					frontend: { packages: frontendPackages },
					backend: { packages: backendPackages },
				} = projectToUpdate;

				const updatedProject = await ProjectModel.findByIdAndUpdate(
					_id,
					{
						installScripts,
						frontend: { packages: frontendPackages },
						backend: { packages: backendPackages },
					},
					{ new: true }
				);

				return updatedProject;
			} catch (error) {
				throw new GraphQLError('Failed to add install scripts', {
					extensions: {
						code: 'INVALID_INPUT',
						invalidArgs: _id,
					},
				});
			}
		},

		editProject: async (parent, { _id, title, description }): Promise<Project> => {
			try {
				// Check if _id is valid (you might want to add more validation here)
				if (!_id) {
					throw new GraphQLError('Invalid project ID', {
						extensions: {
							code: 'INVALID_INPUT',
							invalidArgs: _id,
						},
					});
				}

				const projectToUpdate = await ProjectModel.findByIdAndUpdate(
					_id,
					{
						title,
						description,
					},
					{ new: true }
				);

				return projectToUpdate;
			} catch (error) {
				throw new GraphQLError('Failed to edit project', {
					extensions: {
						code: 'INVALID_INPUT',
						invalidArgs: _id,
					},
				});
			}
		},

		createArticle: async (parent, { title, text, imageUrl, externalLink, createdBy }): Promise<Article> => {
			try {
				console.log('Checking if article already exists...');
				const existingArticle = await ArticleModel.findOne({ title });

				if (existingArticle) {
					throw new GraphQLError(`Article with title ${title} already exists`);
				}

				switch (true) {
					case typeof text !== 'string':
						throw new GraphQLError('Text must be a string', {
							extensions: { code: 'INVALID_INPUT', invalidArgs: text },
						});
					case typeof title !== 'string':
						throw new GraphQLError('Title must be a string', {
							extensions: { code: 'INVALID_INPUT', invalidArgs: title },
						});
					case typeof imageUrl !== 'string':
						throw new GraphQLError('ImageUrl must be a string', {
							extensions: { code: 'INVALID_INPUT', invalidArgs: imageUrl },
						});
					case typeof externalLink !== 'string':
						throw new GraphQLError('ExternalLink must be a string', {
							extensions: {
								code: 'INVALID_INPUT',
								invalidArgs: externalLink,
							},
						});
					default:
						break;
				}

				const newArticleData = {
					title,
					text,
					imageUrl,
					externalLink,
					createdBy,
				};

				const newArticle = new ArticleModel(newArticleData);

				await newArticle.save();

				return newArticle.populate({
					path: 'createdBy',
					model: UserModel,
				});
			} catch (error: unknown) {
				throw new GraphQLError('Failed to create article', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: title,
						text,
						imageUrl,
						externalLink,
						createdBy,
						error,
					},
				});
			}
		},

		createUser: async (parent, { username, email, password }): Promise<User> => {
			try {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
				if (!emailRegex.test(email)) {
					throw new GraphQLError('Email address is malformed', {
						extensions: {
							code: 'INVALID_INPUT',
							invalidArgs: email,
						},
					});
				}

				const passwordRegex =
					/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{6,}/;
				if (!passwordRegex.test(password)) {
					throw new GraphQLError(
						'Password must be at least 6 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
						{
							extensions: {
								code: 'INVALID_INPUT',
								invalidArgs: password,
							},
						}
					);
				}

				const existingEmail = await UserModel.findOne({ email });

				const existingUsername = await UserModel.findOne({ username });

				if (existingEmail || existingUsername) {
					throw new GraphQLError(
						`User with email ${email} or username ${username} already exists`
					);
				}

				// need to has the password
				const salt = genSaltSync(10);
				const hashedPassword = hashSync(password, salt);

				const user = new UserModel({ username, email, passwordHash: hashedPassword });

				console.log('Saving user to the database...', user);
				await user.save();
				return user;
			} catch (error: unknown) {
				throw new GraphQLError('Failed to create user', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: username,
						email,
						password,
						error,
					},
				});
			}
		},
	},
};

export default resolvers;
