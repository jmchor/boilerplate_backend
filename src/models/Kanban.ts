/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Model, Schema, model } from 'mongoose';
import ProjectModel from './Project';
import User from './User';

export interface KanbanDocument extends Document {
	backlog: string[];
	todo: string[];
	doing: string[];
	done: string[];
	project: mongoose.Types.ObjectId | string | null;
	createdBy: mongoose.Types.ObjectId | string | null;
}

const kanbanSchema = new Schema<KanbanDocument>({
	backlog: {
		type: [String],
		default: [],
	},
	todo: {
		type: [String],
		default: [],
	},
	doing: {
		type: [String],
		default: [],
	},
	done: {
		type: [String],
		default: [],
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProjectModel',
	},

	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Kanban: Model<KanbanDocument> = model<KanbanDocument>('Kanban', kanbanSchema);

export default Kanban;
