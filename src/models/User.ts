import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface Articles {
	authored: (mongoose.Types.ObjectId | string | null)[];
	liked: (mongoose.Types.ObjectId | string | null)[];
}

interface UserDocument extends Document {
	username: string;
	email: string;
	passwordHash: string;
	projects: (mongoose.Types.ObjectId | string | null)[];
	articles: Articles[];
}

const userSchema = new Schema<UserDocument>({
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

	projects: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
	articles: {
		authored: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
			},
		],
		liked: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
			},
		],
	},
});

const UserModel: Model<UserDocument> = model<UserDocument>('UserModel', userSchema);

export default UserModel;
