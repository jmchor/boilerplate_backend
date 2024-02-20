import { GraphQLError } from 'graphql';
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts';
import mongoose, { ClientSession } from 'mongoose';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import express, { Request, Response } from 'express';
import { Article, Project, Resolvers, Token, User } from './types.js';

import { generateInstallCommands } from './scripts/installCommands.js';
import { ProjectModel } from './models/Project.model.js';
import { ArticleModel } from './models/Article.model.js';
import { UserModel } from './models/User.model.js';
import { KanbanModel } from './models/Kanban.model.js';

interface LoginInput {
	email?: string;
	username?: string;
	password: string;
}

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

		findProject: async (_, { _id }, { currentUser }): Promise<Project> => {
			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
						http: { status: 401 },
					},
				});
			}
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
		allArticles: async (_, args, { req }): Promise<Article[]> => {
			if (!req.currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
						http: { status: 401 },
					},
				});
			}

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
		findArticle: async (_, { _id }): Promise<Article> => {
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

		currentUser: async (_, __, { currentUser }: { currentUser: User }): Promise<User> => {
			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
						http: { status: 401 },
					},
				});
			}

			const user: User = await UserModel.findById(currentUser._id)
				.populate({
					path: 'projects',
					model: ProjectModel,
				})
				.populate({
					path: 'articles',
					model: ArticleModel,
				})
				.populate({
					path: 'likedArticles',
					model: ArticleModel,
				});

			if (!user) {
				throw new GraphQLError('User not found', {
					extensions: {
						code: 'NOT_FOUND',
						invalidArgs: currentUser._id,
					},
				});
			}

			console.log(user);

			return user;
		},

		myProjects: async (_, __, { currentUser }: { currentUser: User }): Promise<Project[]> => {
			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
						http: { status: 401 },
					},
				});
			}

			const projects = await ProjectModel.find({ createdBy: currentUser._id })
				.populate({
					path: 'articles',
					model: ArticleModel,
				})
				.populate({
					path: 'kanban',
					model: KanbanModel,
				});

			return projects;
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

				await ProjectModel.findByIdAndUpdate(
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

		editProject: async (_, { _id, title, description }): Promise<Project> => {
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

		createArticle: async (_, { title, text, imageUrl, externalLink, createdBy }): Promise<Article> => {
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

				let defaultImage: string;

				if (imageUrl === '') {
					defaultImage =
						'https://res.cloudinary.com/dompqbumr/image/upload/v1708283369/codeBase/default_article_banner_0012.jpg';
				} else {
					defaultImage = imageUrl;
				}

				const newArticleData = {
					title,
					text,
					imageUrl: defaultImage,
					externalLink,
					createdBy,
				};

				const newArticle = new ArticleModel(newArticleData);

				await newArticle.save();

				// update Users articles

				await UserModel.findByIdAndUpdate(createdBy, {
					$push: {
						articles: newArticle._id,
					},
				});

				console.log('Article created successfully');

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

		linkArticleToProject: async (
			_,
			{ _id, projectId }: { _id: string; projectId: string }
		): Promise<Article> => {
			const session: ClientSession = await mongoose.startSession();
			session.startTransaction();
			try {
				// Check if _id is valid (you might want to add more validation here)
				if (!_id || !projectId) {
					throw new GraphQLError('Invalid article or project ID', {
						extensions: {
							code: 'INVALID_INPUT',
							invalidArgs: { _id, projectId },
						},
					});
				}

				await ArticleModel.findByIdAndUpdate(
					_id,
					{
						linkedProjects: projectId,
					},
					{ new: true }
				);

				await ProjectModel.findByIdAndUpdate(
					projectId,
					{ $addToSet: { articles: _id } },
					{ new: true }
				);

				const populatedArticle = await ArticleModel.findById(_id)
					.populate({
						path: 'linkedProjects',
						model: ProjectModel,
					})
					.populate({
						path: 'createdBy',
						model: UserModel,
					})
					.session(session);

				await session.commitTransaction();
				await session.endSession();

				return populatedArticle;
			} catch (error) {
				await session.abortTransaction();
				await session.endSession();
				throw new GraphQLError('Failed to link article to project', {
					extensions: {
						code: 'INVALID_INPUT',
						invalidArgs: _id,
						projectId,
					},
				});
			}
		},

		createUser: async (_, { username, email, password }): Promise<User> => {
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

		login: async (
			_,
			{ input }: { input: LoginInput },
			{ res, req }: { res: Response; req: Request }
		): Promise<Token> => {
			const { email, username, password } = input;
			const secretKey: string = process.env.JWT_SECRET;
			let user: User;

			if (email) {
				user = await UserModel.findOne({ email });
			} else if (username) {
				user = await UserModel.findOne({ username });
			}

			if (!user) {
				throw new GraphQLError('Invalid email or username', {
					extensions: {
						code: 'INVALID_INPUT',
						invalidArgs: { email, username },
					},
				});
			}

			const isValidPassword = compareSync(password, user.passwordHash);

			if (!isValidPassword) {
				throw new GraphQLError('Invalid password', {
					extensions: {
						code: 'INVALID_INPUT',
						invalidArgs: password,
					},
				});
			}

			const token = jwt.sign({ userId: user._id }, secretKey, {
				expiresIn: '1d',
			});

			// res.cookie('token', token, {
			// 	httpOnly: true,
			// 	secure: true,
			// 	expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
			// 	sameSite: true,
			// });

			return { value: token };
		},
	},
};

export default resolvers;
