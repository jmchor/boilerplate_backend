import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // load .env file from the path relative to where the function is envoked --> src/index.ts

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in the environment variables.');
}

export const connectToMongoDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('🌱 connected to MongoDB');
	} catch (error) {
		console.error('error connection to MongoDB:', error.message);
	}
};
