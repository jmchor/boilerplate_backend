import mongoose, { Model, Document, Schema, model } from 'mongoose';
import ProjectModel from './Project';
import User from './User';

interface ArticleDocument extends Document {
	title: string;
	text: string;
	imageUrl?: string;
	externalLink?: string;
	linkedProjects?: (mongoose.Types.ObjectId | string)[];
	createdBy: mongoose.Types.ObjectId | string;
}

const articleSchema = new Schema<ArticleDocument>(
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
		linkedProjects: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProjectModel',
		},
	},
	{
		timestamps: true,
	}
);

const Article: Model<ArticleDocument> = model<ArticleDocument>('Article', articleSchema);

export default Article;
