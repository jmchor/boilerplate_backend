import mongoose, { Model, Schema, model } from 'mongoose';
import ProjectModel from './Project.js';
import User from './User.js';
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
			ref: 'User',
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

const Article: Model<Article> = model<Article>('Article', articleSchema);

export default Article;
