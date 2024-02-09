import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in the environment variables.');
}

console.log('connecting to', MONGODB_URI);

const connectToMongoDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('connected to MongoDB');
	} catch (error) {
		console.error('error connection to MongoDB:', error.message);
	}
};

void connectToMongoDB();
