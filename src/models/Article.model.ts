/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Model, Schema, model } from 'mongoose';
import { ProjectModel } from './Project.model.js';
import { UserModel } from './User.model.js';
import { Article } from '../types.js';

const articleSchema = new Schema<Article>(
	{
		imageUrl: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			required: true,
		},
		subheadline: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			required: true,
		},
		externalLink: {
			type: String,
		},

		tags: {
			type: [String],
			default: [],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserModel',
		},
		linkedProjects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProjectModel',
			},
		],
	},
	{
		timestamps: true,
	}
);

export const ArticleModel: Model<Article> = model<Article>('ArticleModel', articleSchema);
