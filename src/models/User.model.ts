/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, model, Document, Model } from 'mongoose';
import { ProjectModel } from './Project.model.js';
import { ArticleModel } from './Article.model.js';
import { User } from '../types.js';

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
			required: [true, 'Username is required.'],
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		passwordHash: {
			type: String,
			required: [true, 'Password is required.'],
			minlength: 6,
		},

		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProjectModel',
			},
		],

		articles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
				default: [],
			},
		],
		likedArticles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

export const UserModel: Model<User> = model<User>('UserModel', userSchema);
