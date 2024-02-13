import gql from 'graphql-tag';

// test stuff
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type User {
		username: String!
		email: String!
		passwordHash: String!
		projects: [Project]
		articles: [Article]
	}

	type Article {
		title: String!
		text: String!
		imageUrl: String
		externalLink: String
		linkedProjects: [Project]
		createdBy: User
	}

	type Kanban {
		backlog: [String]
		todo: [String]
		doing: [String]
		done: [String]
		project: Project!
		createdBy: User!
	}

	type Project {
		title: String!
		description: String
		createdBy: ID!
		frontend: FrontendConfig!
		backend: BackendConfig!
		installScripts: InstallScripts
		kanban: Kanban
		articles: [Article]
	}

	type FrontendConfig {
		framework: [String!]!
		dataLayer: [String!]
		packages: [String!]!
	}

	type BackendConfig {
		framework: [String!]!
		moduleType: [String!]!
		dataLayer: [String!]
		cms: [String!]
		packages: [String!]!
		database: [String!]!
	}

	type InstallScripts {
		frontend: String
		backend: String
	}

	input FrontendConfigInput {
		framework: [String!]!
		dataLayer: [String!]
		packages: [String!]!
	}

	input BackendConfigInput {
		framework: [String!]!
		moduleType: [String!]!
		dataLayer: [String!]
		cms: [String!]
		packages: [String!]!
		database: [String!]!
	}

	input InstallScriptsInput {
		frontend: String
		backend: String
	}
	input ArticleInput {
		title: String!
		text: String!
		imageUrl: String
		externalLink: String
		createdBy: ID
		# Any other fields from Article that are required for creating a new article
	}

	input KanbanInput {
		backlog: [String]
		todo: [String]
		doing: [String]
		done: [String]
		project: ID!
		createdBy: ID!
	}

	type Query {
		books: [Book]
	}

	type Mutation {
		createProject(
			title: String!
			description: String
			createdBy: ID!
			frontend: FrontendConfigInput!
			backend: BackendConfigInput!
			installScripts: InstallScriptsInput
			kanban: KanbanInput
			articles: [ArticleInput]
		): Project
	}
`;

export default typeDefs;
