import gql from 'graphql-tag';

// test stuff
const typeDefs = gql`
	# enums

	enum ModuleType {
		commonjs
		module
	}

	enum FrontFrame {
		reactts
		reactjs
		vanillajs
		nextjs
	}

	enum BackendEnv {
		nodets
		nodejs
		nodeExpressTS
		nodeExpressJS
	}

	enum Database {
		mongodb
		postgres
	}

	enum CMS {
		keystoneJS
		strapi
	}

	enum Packages {
		jsonwebtoken
		express
		cors
		bcryptjs
		tsx
		dotenv
		GRAPHQL_CODEGEN_CLI
		GRAPHQL_CODEGEN_TYPESCRIPT
		GRAPHQL_CODEGEN_TYPESCRIPT_RESOLVERS
		nodemon
		tsup
		apolloClient
		graphql
		typescript
		typesNode
		mongoose
		pg
		apolloServer
		graphqlTag
		typesJsonwebtoken
		typesBcryptjs
		typesCors
		typesNodemon
		typesPg
		typesExpress
	}

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
		_id: ID!
	}

	type Article {
		title: String!
		text: String!
		imageUrl: String
		externalLink: String
		linkedProjects: [Project]
		createdBy: User
		_id: ID!
	}

	type Kanban {
		backlog: [String]
		todo: [String]
		doing: [String]
		done: [String]
		project: Project!
		createdBy: User!
		_id: ID!
	}

	type Project {
		title: String!
		description: String
		createdBy: User!
		frontend: FrontendConfig!
		backend: BackendConfig!
		installScripts: InstallScripts
		kanban: Kanban
		articles: [Article]
		_id: ID
	}

	type FrontendConfig {
		framework: FrontFrame
		gqlClient: Boolean
		packages: [Packages!]!
	}

	type BackendConfig {
		environment: BackendEnv!
		moduleType: ModuleType
		gqlServer: Boolean
		cms: CMS
		packages: [Packages!]!
		database: Database
	}

	type InstallScripts {
		frontend: String
		backend: String
	}

	input FrontendConfigInput {
		framework: FrontFrame
		gqlClient: Boolean
		packages: [Packages!]!
	}

	input BackendConfigInput {
		environment: BackendEnv!
		moduleType: ModuleType
		gqlServer: Boolean
		cms: CMS
		packages: [Packages!]!
		database: Database
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
		addInstallScript(_id: ID!): Project
	}
`;

export default typeDefs;
