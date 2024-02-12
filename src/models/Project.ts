/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Schema, model, Model } from 'mongoose';
import User from './User';
import Article from './Article';
import { Packages } from '../types/packages';

// Define interface for Project document
export interface ProjectDocument extends Document {
	title: string;
	description?: string;
	createdBy: string | mongoose.Types.ObjectId;

	frontend: {
		framework: ('react-ts' | 'react-js' | 'vanilla-js' | 'next-js')[];
		dataLayer?: 'graphql-client'[];
		packages: Packages[];
	};
	backend: {
		framework: ('node-ts' | 'node-js' | 'node-express-ts' | 'node-express-js')[];
		moduleType: ('commonjs' | 'module')[];
		dataLayer?: ('graphql-server' | '')[];
		cms?: ('keystone' | '')[];
		packages: Packages[];
		database: ('mongodb' | 'postgres')[];
	};
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
				type: [
					{
						type: String,
						enum: ['react-ts', 'react-js', 'vanilla-js', 'next-js'],
					},
				],
				default: [],
			},

			dataLayer: {
				type: [{ type: String, enum: ['graphql-client'] }],
				default: [],
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
			framework: {
				type: [
					{
						type: String,
						enum: ['node-ts', 'node-js', 'node-express-ts', 'node-express-js'],
					},
				],
				default: [],
			},
			moduleType: {
				type: [{ type: String, enum: ['commonjs', 'module'] }],
				default: [],
			},
			dataLayer: {
				type: [{ type: String, enum: ['graphql-server'] }],
				default: [],
			},
			cms: {
				type: [{ type: String, enum: ['keystone'] }],
				default: [],
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
				type: [{ type: String, enum: ['mongodb', 'postgres'] }],
				default: [],
			},
		},
		kanban: {
			type: Schema.Types.ObjectId,
			ref: 'Kanban',
			default: null,
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
const Project: Model<ProjectDocument> = model<ProjectDocument>('Project', projectSchema);

export default Project;
