import gql from 'graphql-tag';

const typeDefs = gql`
	# enums

	scalar Date

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
		imageUrl: String
		passwordHash: String!
		projects: [Project]
		articles: [Article]
		likedArticles: [Article]
		_id: ID
	}

	type Article {
		title: String!
		text: String
		subheadline: String
		tags: [String]
		imageUrl: String
		externalLink: String
		linkedProjects: [Project]
		createdBy: User
		_id: ID
		createdAt: Date
	}
	type KanbanCard {
		title: String
	}

	type Kanban {
		backlog: [KanbanCard]
		todo: [KanbanCard]
		doing: [KanbanCard]
		done: [KanbanCard]
		project: Project!
		createdBy: User!
		_id: ID!
	}

	type Project {
		title: String
		description: String
		createdBy: User
		frontend: FrontendConfig
		backend: BackendConfig
		installScripts: InstallScripts
		kanban: Kanban
		articles: [Article]
		tags: [String]
		_id: ID
	}

	type FrontendConfig {
		framework: FrontFrame
		gqlClient: Boolean
		packages: [Packages]
	}

	type BackendConfig {
		environment: BackendEnv
		moduleType: ModuleType
		gqlServer: Boolean
		cms: CMS
		packages: [Packages]
		database: Database
	}

	type InstallScripts {
		frontend: String
		backend: String
	}

	input FrontendConfigInput {
		framework: FrontFrame
		gqlClient: Boolean
		packages: [Packages]
	}

	input BackendConfigInput {
		environment: BackendEnv
		moduleType: ModuleType
		gqlServer: Boolean
		cms: CMS
		packages: [Packages]
		database: Database
	}

	input InstallScriptsInput {
		frontend: String
		backend: String
	}
	input ArticleInput {
		title: String
		text: String
		subheadline: String
		tags: [String]
		imageUrl: String
		externalLink: String
		linkedProjects: [ID]
		createdBy: ID
		# Any other fields from Article that are required for creating a new article
	}

	input KanbanCardInput {
		title: String
	}

	input KanbanInput {
		backlog: [KanbanCardInput]
		todo: [KanbanCardInput]
		doing: [KanbanCardInput]
		done: [KanbanCardInput]
		project: ID
		createdBy: ID
	}

	input LoginInput {
		input: String
		password: String!
	}

	type Token {
		value: String!
		isAuthenticated: Boolean
	}

	type LogoutResponse {
		loggedOut: Boolean
	}

	type Authenticationstatus {
		cookieIsPresent: Boolean
	}

	type Title {
		title: String
		type: String
	}

	type TagWithType {
		tag: String
		type: String
	}

	type Query {
		allProjects(limit: Int): [Project]
		findProject(_id: ID): Project
		searchProject(title: String): ID
		searchProjectsByTag(_id: ID, tag: String): [Project]

		allArticles(limit: Int): [Article]
		findArticle(_id: ID): Article
		searchArticleByTitle(title: String): ID
		searchArticlesByTag(_id: ID, tag: String): [Article]

		allTags: [TagWithType]

		allTitles: [Title]

		currentUser: User

		myProjects: [Project]

		checkAuthentication: Authenticationstatus!

		findKanban(_id: ID): Kanban
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
			tags: [String]
		): Project
		addInstallScript(_id: ID!): Project

		editProject(_id: ID!, title: String, description: String, createdBy: ID!, tags: [String]): Project

		deleteProject(_id: ID!, createdBy: ID!): Boolean

		deleteArticle(_id: ID!, createdBy: ID!): Boolean

		createKanban(
			backlog: [KanbanCardInput]
			todo: [KanbanCardInput]
			doing: [KanbanCardInput]
			done: [KanbanCardInput]
			project: ID!
			createdBy: ID!
		): Kanban

		deleteKanban(_id: ID!, createdBy: ID!): Boolean

		editKanban(
			_id: ID!
			backlog: [KanbanCardInput]
			todo: [KanbanCardInput]
			doing: [KanbanCardInput]
			done: [KanbanCardInput]
		): Kanban

		deleteUser(_id: ID!, password: String!): Boolean

		createArticle(
			title: String!
			text: String!
			subheadline: String
			tags: [String]
			imageUrl: String
			externalLink: String
			linkedProjects: [ID]
			createdBy: ID!
		): Article

		linkArticleToProject(_id: ID!, projectId: ID!): Article

		editArticle(
			_id: ID!
			title: String
			text: String
			subheadline: String
			tags: [String]
			imageUrl: String
			externalLink: String
			createdBy: ID!
		): Article

		createUser(username: String!, email: String!, password: String!, imageUrl: String): User

		editUser(_id: ID!, username: String, email: String, imageUrl: String): User

		updatePassword(_id: ID!, oldPassword: String!, newPassword: String!): User

		login(credentials: LoginInput!): Token

		logout: LogoutResponse
	}
`;

export default typeDefs;
