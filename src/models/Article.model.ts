import mongoose, { Model, Schema, model } from 'mongoose';
import { ProjectModel } from './Project.model.js';
import { UserModel } from './User.model.js';
import { Article } from '../types.js';

// export interface ArticleDocument extends Document {
// 	title: string;
// 	text: string;
// 	imageUrl?: string;
// 	externalLink?: string;
// 	linkedProjects?: (mongoose.Types.ObjectId | string)[];
// 	createdBy: mongoose.Types.ObjectId | string;
// }

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
		text: {
			type: String,
			required: true,
		},
		externalLink: {
			type: String,
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
