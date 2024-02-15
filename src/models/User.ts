/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, model, Document, Model } from 'mongoose';
import ProjectModel from './Project.js';
import Article from './Article.js';
import { User, Project } from '../types.js';

// interface Articles {
// 	authored: (mongoose.Types.ObjectId | string | null)[];
// 	liked: (mongoose.Types.ObjectId | string | null)[];
// }

// export interface UserDocument extends Document {
// 	username: string;
// 	email: string;
// 	passwordHash: string;
// 	projects?: (mongoose.Types.ObjectId | string | null)[];
// 	articles?: Articles[];
// }

const userSchema = new Schema<User>(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},

		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProjectModel',
			},
		],
		articles: {
			authored: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Article',
					default: [],
				},
			],
			liked: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Article',
					default: [],
				},
			],
		},
	},
	{
		timestamps: true,
	}
);

const User: Model<User> = model<User>('User', userSchema);

export default User;
