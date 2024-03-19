import { Schema, model, Model } from 'mongoose';
import { KanbanModel } from './Kanban.model.js';

import { Project } from '../types.js';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from './User.model.js';
import { ArticleModel } from './Article.model.js';

const projectSchema = new Schema<Project>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'UserModel',
		},

		frontend: {
			framework: {
				type: String,
				enum: ['reactts', 'reactjs', 'vanillajs', 'nextjs'],
				default: null,
			},

			gqlClient: {
				type: Boolean,
				default: false,
			},
			packages: {
				type: [
					{
						type: String,
						enum: [
							'tsx',
							'nodemon',
							'tsup',
							'@apollo/client',
							'graphql',
							'typescript',
							'@types/nodemon',
						],
					},
				],
				default: [],
			},
		},
		backend: {
			environment: {
				type: String,
				enum: ['nodets', 'nodejs', 'nodeExpressTS', 'nodeExpressJS'],

				default: null,
			},
			moduleType: {
				type: String,
				enum: ['commonjs', 'module'],
				default: null,
			},
			gqlServer: {
				type: Boolean,
				default: false,
			},
			cms: {
				type: String,
				enum: ['keystoneJS', 'strapi'],
				default: null,
			},
			packages: {
				type: [
					{
						type: String,
						enum: [
							'jsonwebtoken',
							'cors',
							'bcryptjs',
							'tsx',
							'dotenv',
							'@graphql-codegen/cli',
							'@graphql-codegen/typescript',
							'@graphql-codegen/typescript-resolvers',
							'nodemon',
							'tsup',
							'@apollo/client',
							'graphql',
							'typescript',
							'@types/node',
							'mongoose',
							'@apollo/server',
							'pg',
							'@types/jsonwebtoken',
							'@types/bcryptjs',
							'@types/cors',
							'@types/nodemon',
							'@types/pg',
						],
					},
				],
				default: [],
			},

			database: {
				type: String,
				enum: ['mongodb', 'postgres'],
				default: null,
			},
		},
		kanban: {
			type: Schema.Types.ObjectId,
			ref: 'KanbanModel',
		},

		articles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'ArticleModel',
			},
		],

		installScripts: {
			frontend: {
				type: String,
				default: null,
			},
			backend: {
				type: String,
				default: null,
			},
		},

		tags: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// Define mongoose model for Project
export const ProjectModel: Model<Project> = model<Project>('ProjectModel', projectSchema);
