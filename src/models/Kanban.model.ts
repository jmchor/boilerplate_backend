import mongoose, { Model, Schema, model } from 'mongoose';
import { ProjectModel } from './Project.model.js';
import { UserModel } from './User.model.js';
import { Kanban } from '../types.js';

const kanbanSchema = new Schema<Kanban>({
	backlog: {
		type: [
			{
				title: String,
			},
		],
		default: [],
	},

	todo: {
		type: [
			{
				title: String,
			},
		],
		default: [],
	},

	doing: {
		type: [
			{
				title: String,
			},
		],
		default: [],
	},

	done: {
		type: [
			{
				title: String,
			},
		],
		default: [],
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProjectModel',
	},

	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
	},
});

export const KanbanModel: Model<Kanban> = model<Kanban>('KanbanModel', kanbanSchema);
