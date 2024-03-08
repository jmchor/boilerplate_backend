/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLError } from 'graphql';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import mongoose, { ClientSession } from 'mongoose';
import jwt from 'jsonwebtoken';

import { ProjectModel } from './models/Project.model.js';
import { ArticleModel } from './models/Article.model.js';
import { UserModel } from './models/User.model.js';
import { KanbanModel } from './models/Kanban.model.js';

import { Article, Authenticationstatus, LogoutResponse, Project, Resolvers, Token, User } from './types.js';
import {
	BaseArgs,
	CreateProjectArgs,
	CreateArticleArgs,
	EditArticleArgs,
	DeleteDocument,
	DeleteUser,
	LinkArticleToProject,
	LoginInput,
	UpdatePasswordArgs,
	EditProjectArgs,
	EditUserArgs,
	UserContext,
	ReqResContext,
	CreateUserArgs,
} from './types/argTypes.js';

import { generateInstallCommands } from './scripts/installCommands.js';
import { checkLoggedInUser } from './utils/checkLoggedInUser.js';
import { checkUserIsAuthor } from './utils/checkUserIsAuthor.js';
import { passwordValidation } from './utils/passwordValidation.js';
import { inputRegex } from './utils/passwordRegex.js';
import dateScalar from './types/customDateScalar.js';
import { sanitizeText } from './utils/sanitizeText.js';

const resolvers: Resolvers = {
	Date: dateScalar,
	Query: {
		// eslint-disable-next-line @typescript-eslint/require-await
		checkAuthentication: async (_, args, { req }: ReqResContext): Promise<Authenticationstatus> => {
			const { token } = req.cookies as { token?: string };

			if (!token) {
				return {
					cookieIsPresent: false,
				};
			}

			try {
				const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

				return {
					cookieIsPresent: true,
				};
			} catch (error: unknown) {
				throw new GraphQLError('Invalid token', {
					extensions: {
						code: 'INVALID_TOKEN',
					},
				});

				return {
					cookieIsPresent: false,
				};
			}
		},
		allProjects: async (_, { limit }: { limit: number }): Promise<Project[]> => {
			const projects = await ProjectModel.find().limit(limit).sort({ createdAt: -1 });

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

		findProject: async (_, { _id }: BaseArgs, { currentUser }: UserContext): Promise<Project> => {
			checkLoggedInUser(currentUser);

			const project = await ProjectModel.findById(_id);

			if (!project) {
				throw new GraphQLError('Project not found', {
					extensions: {
						code: 'NOT_FOUND',
						invalidArgs: _id,
					},
				});
			}

			return project.populate({
				path: 'createdBy',
				model: UserModel,
			});
		},
		allArticles: async (): Promise<Article[]> => {
			const articles = await ArticleModel.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

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
		findArticle: async (_, { _id }: BaseArgs): Promise<Article> => {
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

		currentUser: async (_, __, { req }: ReqResContext): Promise<User> => {
			const { currentUser } = req;
			checkLoggedInUser(currentUser);

			const user: User = await UserModel.findById(currentUser._id)
				.populate({
					path: 'projects',
					model: ProjectModel,
					options: { sort: { createdAt: -1 } },
				})
				.populate({
					path: 'articles',
					model: ArticleModel,
					options: { sort: { createdAt: -1 } },
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

			return user;
		},

		myProjects: async (_, __, { currentUser }: UserContext): Promise<Project[]> => {
			checkLoggedInUser(currentUser);

			const projects = await ProjectModel.find({ createdBy: currentUser._id })
				.populate({
					path: 'articles',
					model: ArticleModel,
				})
				.populate({
					path: 'kanban',
					model: KanbanModel,
				});

			if (!projects) {
				throw new GraphQLError('No projects found');
			}

			return projects;
		},
	},

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

	Mutation: {
		createProject: async (
			parent,
			{ title, description, createdBy, frontend, backend }: CreateProjectArgs,
			{ req }: ReqResContext
		): Promise<Project> => {
			const { currentUser } = req;

			checkLoggedInUser(currentUser);

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

				const newProject = await new ProjectModel(newProjectData).save();

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

				// update the user with the new project

				await UserModel.findByIdAndUpdate(
					createdBy,
					{
						$push: {
							projects: updatedProject._id,
						},
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

		editProject: async (
			_,
			{ _id, title, description, createdBy }: EditProjectArgs,
			{ req }: ReqResContext
		): Promise<Project> => {
			try {
				const { currentUser } = req;
				checkLoggedInUser(currentUser);

				checkUserIsAuthor(currentUser, createdBy);

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

		deleteProject: async (
			_,
			{ _id, createdBy }: DeleteDocument,
			{ req }: ReqResContext
		): Promise<boolean> => {
			const { currentUser } = req;
			checkLoggedInUser(currentUser);
			checkUserIsAuthor(currentUser, createdBy);

			try {
				await ProjectModel.findByIdAndDelete(_id);
				return true;
			} catch (error) {
				throw new GraphQLError('Failed to delete project', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
					},
				});

				return false;
			}
		},

		deleteKanban: async (_, { _id, createdBy }: DeleteDocument, { req }: ReqResContext) => {
			const { currentUser } = req;
			checkLoggedInUser(currentUser);
			checkUserIsAuthor(currentUser, createdBy);

			try {
				await KanbanModel.findByIdAndDelete(_id);
				return true;
			} catch (error) {
				throw new GraphQLError('Failed to delete kanban', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
					},
				});
				return false;
			}
		},

		createArticle: async (
			_,
			{ title, text, subheadline, tags, imageUrl, externalLink, createdBy }: CreateArticleArgs,
			{ currentUser }: UserContext
		): Promise<Article> => {
			// checkLoggedInUser(currentUser);

			try {
				console.log('Checking if article already exists...');
				const existingArticle = await ArticleModel.findOne({ title });

				if (existingArticle) {
					throw new GraphQLError(`Article with title ${title} already exists`);
				}

				let defaultImage: string;

				const cleanText = sanitizeText(text);

				if (imageUrl === '' || !imageUrl) {
					defaultImage =
						'https://res.cloudinary.com/dompqbumr/image/upload/v1708283369/codeBase/default_article_banner_0012.jpg';
				} else {
					defaultImage = imageUrl;
				}

				const newArticleData = {
					title,
					text: cleanText,
					subheadline,
					tags,
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
						tags,
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
			{ _id, projectId }: LinkArticleToProject,
			{ currentUser }: UserContext
		): Promise<Article> => {
			const session: ClientSession = await mongoose.startSession();
			session.startTransaction();

			checkLoggedInUser(currentUser);

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

		editArticle: async (
			_,
			{ _id, title, text, subheadline, tags, imageUrl, externalLink, createdBy }: EditArticleArgs,
			{ currentUser }: UserContext
		): Promise<Article> => {
			checkLoggedInUser(currentUser);
			checkUserIsAuthor(currentUser, createdBy);

			const cleanText = sanitizeText(text);

			try {
				const article = await ArticleModel.findByIdAndUpdate(
					_id,
					{
						title,
						text: cleanText,
						subheadline,
						tags,
						imageUrl,
						externalLink,
					},
					{ new: true }
				);
				return article.populate({
					path: 'createdBy',
					model: UserModel,
				});
			} catch (error) {
				throw new GraphQLError('Failed to edit article', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
					},
				});
			}
		},

		deleteArticle: async (
			_,
			{ _id, createdBy }: DeleteDocument,
			{ currentUser }: UserContext
		): Promise<boolean> => {
			checkLoggedInUser(currentUser);
			checkUserIsAuthor(currentUser, createdBy);

			try {
				await ArticleModel.findByIdAndDelete(_id);
				return true;
			} catch (error) {
				throw new GraphQLError('Failed to delete article', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
					},
				});
				return false;
			}
		},

		createUser: async (_, { username, email, password, image }: CreateUserArgs): Promise<User> => {
			try {
				inputRegex(email, 'email');

				inputRegex(password, 'password');

				const existingEmail = await UserModel.findOne({ email });

				const existingUsername = await UserModel.findOne({ username });

				if (existingEmail || existingUsername) {
					throw new GraphQLError(
						`User with email ${email} or username ${username} already exists`
					);
				}

				let defaultImage: string;

				if (image === '') {
					defaultImage =
						'https://res.cloudinary.com/dompqbumr/image/upload/v1709477275/codeBase/default_boiler.svg';
				} else {
					defaultImage = image;
				}

				// need to has the password
				const salt = genSaltSync(10);
				const hashedPassword = hashSync(password, salt);

				const user = new UserModel({
					username,
					email,
					image: defaultImage,
					passwordHash: hashedPassword,
				});

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

		editUser: async (
			_,
			{ _id, username, email }: EditUserArgs,
			{ currentUser }: UserContext
		): Promise<User> => {
			checkLoggedInUser(currentUser);
			checkUserIsAuthor(currentUser, _id);

			inputRegex(email, 'email');

			try {
				const existingEmail = await UserModel.findOne({ email });

				if (existingEmail) {
					throw new GraphQLError(`User with email ${email} already exists`);
				}

				const existingUsername = await UserModel.findOne({ username });

				if (existingUsername) {
					throw new GraphQLError(`User with username ${username} already exists`);
				}

				const updateUser = await UserModel.findByIdAndUpdate(
					_id,
					{
						username,
						email,
					},
					{ new: true }
				);
				return updateUser;
			} catch (error: unknown) {
				throw new GraphQLError('Failed to update user', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
						username,
						email,
						error,
					},
				});
			}
		},

		updatePassword: async (
			_,
			{ _id, oldPassword, newPassword }: UpdatePasswordArgs,
			{ currentUser }: UserContext
		): Promise<User> => {
			checkUserIsAuthor(currentUser, _id);

			passwordValidation(oldPassword, currentUser.passwordHash);

			inputRegex(newPassword, 'password');

			const salt = genSaltSync(10);
			const hashedPassword = hashSync(newPassword, salt);

			const updateUser = await UserModel.findByIdAndUpdate(
				_id,
				{
					passwordHash: hashedPassword,
				},
				{ new: true }
			);

			// add logout logic

			return updateUser;
		},

		deleteUser: async (
			_,
			{ _id, password }: DeleteUser,
			{ currentUser }: UserContext
		): Promise<boolean> => {
			checkLoggedInUser(currentUser);
			passwordValidation(password, currentUser.passwordHash);

			try {
				await UserModel.findByIdAndDelete(_id);
			} catch (error) {
				throw new GraphQLError('Failed to delete user', {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
						invalidArgs: _id,
					},
				});
			}

			return true;
		},

		login: async (
			_,
			{ credentials }: { credentials: LoginInput },
			{ res, req }: ReqResContext
		): Promise<Token> => {
			const { input, password } = credentials;
			const secretKey: string = process.env.JWT_SECRET;
			let user: User;
			let username: string;
			let email: string;

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

			if (emailRegex.test(input)) {
				email = input;
				user = await UserModel.findOne({ email });
			} else {
				username = input;
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

			passwordValidation(password, user.passwordHash);

			const token = jwt.sign({ userId: user._id }, secretKey, {
				expiresIn: '1d',
			});

			res.cookie('token', token, {
				httpOnly: true,
				secure: true,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
				sameSite: true,
			});

			return { value: token, isAuthenticated: true };
		},

		// eslint-disable-next-line @typescript-eslint/require-await
		logout: async (_, __, { res }: ReqResContext): Promise<LogoutResponse> => {
			res.clearCookie('token', {
				httpOnly: true,
				expires: new Date(0),
				secure: true,
				sameSite: true,
			});
			return {
				loggedOut: true,
			};
		},
	},
};

export default resolvers;
