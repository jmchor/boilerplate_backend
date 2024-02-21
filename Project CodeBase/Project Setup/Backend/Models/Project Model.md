---
To Do: false
trello_plugin_note_id: u7FF0E8A4_wJnLk361IFn
trello_board_card_id: 65c220bf14f6c41810a2283e;65c3185e162cee943ec8d960
---

metaData {
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	//for a header image or sth
	imageUrl: {
		type: String,
	},
	createdAt : {
	}

},

frontend: {
	framework: {
		type: [String],
		enum ['react-ts', 'react-js', 'vanilla-js', 'next-js', '', ]
	},
	dataLayer: {
		type: [String],
		enum: ['graphql-client', ]
		}
	
}
backend: {
	framework: {
		type: [String],
		enum ['node-ts', 'node-js', 'node-express-ts', 'node-express-js', ]
	},
	dataLayer: {
		type: [String],
		enum: ['graphql-server', ]
	},
	cms: {
		type: [String],
		enum: ['keystone']
	},
	packages: {
		type: [String],
		enum: ['jwt', 'cors', 'bcrypt', '' ]
	},
	database: {
		type: [String],
		enum: ['mongodb', 'postgres']
	},
kanban: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Kanban'
	},
articles: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Articles'
	}],
},


```ts
import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Project document
interface ProjectDocument extends Document {
  metaData: {
    title: string;
    description?: string;
    projectLead?: mongoose.Types.ObjectId | string; // Reference to User model
    createdAt?: Date;
  };
  frontend: {
    framework: ('react-ts' | 'react-js' | 'vanilla-js' | 'next-js')[];
    dataLayer: ('graphql-client')[];
  };
  backend: {
    framework: ('node-ts' | 'node-js' | 'node-express-ts' | 'node-express-js')[];
    dataLayer: ('graphql-server')[];
    cms: ('keystone')[];
    packages: ('jwt' | 'cors' | 'bcrypt' | '')[];
    database: ('mongodb' | 'postgres')[];
  };
  kanban: mongoose.Types.ObjectId | string | null; // Reference to Kanban model
  articles: (mongoose.Types.ObjectId | string)[]; // Array of references to Article model
}

// Define mongoose schema for Project
const projectSchema = new Schema<ProjectDocument>({
  metaData: {
    title: { type: String, required: true },
    description: { type: String },
    projectLead: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  },
  frontend: {
    framework: {
      type: [{ type: String, enum: ['react-ts', 'react-js', 'vanilla-js', 'next-js'] }],
      default: [],
    },
    dataLayer: {
      type: [{ type: String, enum: ['graphql-client'] }],
      default: [],
    },
  },
  backend: {
    framework: {
      type: [{ type: String, enum: ['node-ts', 'node-js', 'node-express-ts', 'node-express-js'] }],
      default: [],
    },
    dataLayer: {
      type: [{ type: String, enum: ['graphql-server'] }],
      default: [],
    },
    cms: {
      type: [{ type: String, enum: ['keystone'] }],
      default: [],
    },
    packages: {
      type: [{ type: String, enum: ['jwt', 'cors', 'bcrypt', ''] }],
      default: [],
    },
    database: {
      type: [{ type: String, enum: ['mongodb', 'postgres'] }],
      default: [],
    },
  },
  kanban: { type: Schema.Types.ObjectId, ref: 'Kanban', default: null }, // Reference to Kanban model
  articles: [{ type: Schema.Types.ObjectId, ref: 'Articles' }], // Array of references to Article model
});

// Define mongoose model for Project
const Project = mongoose.model<ProjectDocument>('Project', projectSchema);

export default Project;



```
