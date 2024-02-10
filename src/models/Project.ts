/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Schema, model, Model } from 'mongoose';
import User from './User';
import Article from './Article';

// Define interface for Project document
export interface ProjectDocument extends Document {
	metaData: {
		title: string;
		description?: string;
		createdBy: mongoose.Types.ObjectId;
	};
	frontend: {
		framework: ('react-ts' | 'react-js' | 'vanilla-js' | 'next-js')[];
		dataLayer?: 'graphql-client'[];
	};
	backend: {
		framework: ('node-ts' | 'node-js' | 'node-express-ts' | 'node-express-js')[];
		dataLayer?: ('graphql-server' | '')[];
		cms?: ('keystone' | '')[];
		packages: (
			| 'jwt'
			| 'cors'
			| 'bcrypt'
			| 'tsx'
			| 'dotenv'
			| '@graphql-codegen/cli'
			| '@graphql-codegen/typescript'
			| '@graphql-codegen/typescript-resolvers'
			| 'nodemon'
			| 'tsup'
		)[];
		database: ('mongodb' | 'postgres')[];
	};
	kanban: mongoose.Types.ObjectId | string | null; // Reference to Kanban model
	articles: (mongoose.Types.ObjectId | string)[]; // Array of references to Article model
}

// Define mongoose schema for Project
const projectSchema = new Schema<ProjectDocument>(
	{
		metaData: {
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
							'jwt',
							'cors',
							'bcrypt',
							'tsx',
							'dotenv',
							'@graphql-codegen/cli',
							'@graphql-codegen/typescript',
							'@graphql-codegen/typescript-resolvers',
							'nodemon',
							'tsup',
							'',
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
	},
	{
		timestamps: true,
	}
);

// Define mongoose model for Project
const Project: Model<ProjectDocument> = model<ProjectDocument>('Project', projectSchema);

export default Project;
