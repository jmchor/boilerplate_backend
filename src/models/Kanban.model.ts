import mongoose, { Model, Schema, model } from 'mongoose';
import { ProjectModel } from './Project.model.js';
import { UserModel } from './User.model.js';
import { Kanban } from '../types.js';

// export interface KanbanDocument extends Document {
// 	backlog: string[];
// 	todo: string[];
// 	doing: string[];
// 	done: string[];
// 	project: mongoose.Types.ObjectId | string | null;
// 	createdBy: mongoose.Types.ObjectId | string | null;
// }

const kanbanSchema = new Schema<Kanban>({
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
		ref: 'UserModel',
	},
});

export const KanbanModel: Model<Kanban> = model<Kanban>('KanbanModel', kanbanSchema);
