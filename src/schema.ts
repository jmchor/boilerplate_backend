import gql from 'graphql-tag';

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
		bcryptts
		tsx
		dotenv
		graphql_codegen_cli
		graphql_codegen_typescript
		graphql_codegen_typescript_resolvers
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

	type User {
		username: String!
		email: String!
		passwordHash: String!
		projects: [Project]
		articles: [Article]
		likedArticles: [Article]
		_id: ID
	}

	type Article {
		title: String!
		text: String!
		imageUrl: String
		externalLink: String
		linkedProjects: [Project]
		createdBy: User!
		_id: ID
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
		linkedProjects: [ID]
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

	input LoginInput {
		email: String
		username: String
		password: String!
	}

	type Token {
		value: String!
	}

	type Query {
		allProjects: [Project]
		findProject(_id: ID): Project
		searchProject(_id: ID, title: String): Project

		allArticles: [Article]
		findArticle(_id: ID): Article

		currentUser: User

		myProjects: [Project]
	}

	type Mutation {
		##Project CRUD
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

		editProject(_id: ID!, title: String, description: String): Project

		deleteProject(_id: ID!): Project

		deleteArticle(_id: ID!): Article

		createArticle(
			title: String!
			text: String!
			imageUrl: String
			externalLink: String
			linkedProjects: [ID]
			createdBy: ID!
		): Article

		linkArticleToProject(_id: ID!, projectId: ID!): Article

		createUser(username: String!, email: String!, password: String!): User

		login(input: LoginInput!): Token
	}
`;

export default typeDefs;
