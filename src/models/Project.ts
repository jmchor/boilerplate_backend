import mongoose, { Document, Schema, model, Model } from 'mongoose';

import { FrontendConfig, BackendConfig } from '../types';
/* eslint-disable @typescript-eslint/no-unused-vars */
import User from './User';
import Article from './Article';

// Define interface for Project document
export interface ProjectDocument extends Document {
	_id?: mongoose.Types.ObjectId;
	title: string;
	description?: string;
	createdBy: string | mongoose.Types.ObjectId;

	frontend: FrontendConfig;
	backend: BackendConfig;
	installScripts?: {
		frontend?: string;
		backend?: string;
	};
	kanban?: mongoose.Types.ObjectId | string | null; // Reference to Kanban model
	articles?: (mongoose.Types.ObjectId | string)[]; // Array of references to Article model
}

// Define mongoose schema for Project
const projectSchema = new Schema<ProjectDocument>(
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
			ref: 'User',
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
			ref: 'Kanban',
			default: '',
		},
		articles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Articles',
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
	},
	{
		timestamps: true,
	}
);

// Define mongoose model for Project
const ProjectModel: Model<ProjectDocument> = model<ProjectDocument>('ProjectModel', projectSchema);

export default ProjectModel;
