import { GraphQLResolveInfo } from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Article = {
	__typename?: 'Article';
	_id?: Maybe<Scalars['ID']['output']>;
	createdBy: User;
	externalLink?: Maybe<Scalars['String']['output']>;
	imageUrl?: Maybe<Scalars['String']['output']>;
	linkedProjects?: Maybe<Array<Maybe<Project>>>;
	text: Scalars['String']['output'];
	title: Scalars['String']['output'];
};

export type ArticleInput = {
	createdBy?: InputMaybe<Scalars['ID']['input']>;
	externalLink?: InputMaybe<Scalars['String']['input']>;
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	linkedProjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
	text: Scalars['String']['input'];
	title: Scalars['String']['input'];
};

export type BackendConfig = {
	__typename?: 'BackendConfig';
	cms?: Maybe<Cms>;
	database?: Maybe<Database>;
	environment: BackendEnv;
	gqlServer?: Maybe<Scalars['Boolean']['output']>;
	moduleType?: Maybe<ModuleType>;
	packages: Array<Packages>;
};

export type BackendConfigInput = {
	cms?: InputMaybe<Cms>;
	database?: InputMaybe<Database>;
	environment: BackendEnv;
	gqlServer?: InputMaybe<Scalars['Boolean']['input']>;
	moduleType?: InputMaybe<ModuleType>;
	packages: Array<Packages>;
};

export enum BackendEnv {
	NodeExpressJs = 'nodeExpressJS',
	NodeExpressTs = 'nodeExpressTS',
	Nodejs = 'nodejs',
	Nodets = 'nodets',
}

export enum Cms {
	KeystoneJs = 'keystoneJS',
	Strapi = 'strapi',
}

export enum Database {
	Mongodb = 'mongodb',
	Postgres = 'postgres',
}

export enum FrontFrame {
	Nextjs = 'nextjs',
	Reactjs = 'reactjs',
	Reactts = 'reactts',
	Vanillajs = 'vanillajs',
}

export type FrontendConfig = {
	__typename?: 'FrontendConfig';
	framework?: Maybe<FrontFrame>;
	gqlClient?: Maybe<Scalars['Boolean']['output']>;
	packages: Array<Packages>;
};

export type FrontendConfigInput = {
	framework?: InputMaybe<FrontFrame>;
	gqlClient?: InputMaybe<Scalars['Boolean']['input']>;
	packages: Array<Packages>;
};

export type InstallScripts = {
	__typename?: 'InstallScripts';
	backend?: Maybe<Scalars['String']['output']>;
	frontend?: Maybe<Scalars['String']['output']>;
};

export type InstallScriptsInput = {
	backend?: InputMaybe<Scalars['String']['input']>;
	frontend?: InputMaybe<Scalars['String']['input']>;
};

export type Kanban = {
	__typename?: 'Kanban';
	_id: Scalars['ID']['output'];
	backlog?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
	createdBy: User;
	doing?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
	done?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
	project: Project;
	todo?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type KanbanInput = {
	backlog?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
	createdBy: Scalars['ID']['input'];
	doing?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
	done?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
	project: Scalars['ID']['input'];
	todo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum ModuleType {
	Commonjs = 'commonjs',
	Module = 'module',
}

export type Mutation = {
	__typename?: 'Mutation';
	addInstallScript?: Maybe<Project>;
	createArticle?: Maybe<Article>;
	createProject?: Maybe<Project>;
	createUser?: Maybe<User>;
	deleteArticle?: Maybe<Article>;
	deleteProject?: Maybe<Project>;
	editProject?: Maybe<Project>;
};

export type MutationAddInstallScriptArgs = {
	_id: Scalars['ID']['input'];
};

export type MutationCreateArticleArgs = {
	createdBy: Scalars['ID']['input'];
	externalLink?: InputMaybe<Scalars['String']['input']>;
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	text: Scalars['String']['input'];
	title: Scalars['String']['input'];
};

export type MutationCreateProjectArgs = {
	articles?: InputMaybe<Array<InputMaybe<ArticleInput>>>;
	backend: BackendConfigInput;
	createdBy: Scalars['ID']['input'];
	description?: InputMaybe<Scalars['String']['input']>;
	frontend: FrontendConfigInput;
	installScripts?: InputMaybe<InstallScriptsInput>;
	kanban?: InputMaybe<KanbanInput>;
	title: Scalars['String']['input'];
};

export type MutationCreateUserArgs = {
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
	username: Scalars['String']['input'];
};

export type MutationDeleteArticleArgs = {
	_id: Scalars['ID']['input'];
};

export type MutationDeleteProjectArgs = {
	_id: Scalars['ID']['input'];
};

export type MutationEditProjectArgs = {
	_id: Scalars['ID']['input'];
	description?: InputMaybe<Scalars['String']['input']>;
	title?: InputMaybe<Scalars['String']['input']>;
};

export enum Packages {
	ApolloClient = 'apolloClient',
	ApolloServer = 'apolloServer',
	Bcryptjs = 'bcryptjs',
	Bcryptts = 'bcryptts',
	Cors = 'cors',
	Dotenv = 'dotenv',
	Express = 'express',
	Graphql = 'graphql',
	GraphqlTag = 'graphqlTag',
	GraphqlCodegenCli = 'graphql_codegen_cli',
	GraphqlCodegenTypescript = 'graphql_codegen_typescript',
	GraphqlCodegenTypescriptResolvers = 'graphql_codegen_typescript_resolvers',
	Jsonwebtoken = 'jsonwebtoken',
	Mongoose = 'mongoose',
	Nodemon = 'nodemon',
	Pg = 'pg',
	Tsup = 'tsup',
	Tsx = 'tsx',
	TypesBcryptjs = 'typesBcryptjs',
	TypesCors = 'typesCors',
	TypesExpress = 'typesExpress',
	TypesJsonwebtoken = 'typesJsonwebtoken',
	TypesNode = 'typesNode',
	TypesNodemon = 'typesNodemon',
	TypesPg = 'typesPg',
	Typescript = 'typescript',
}

export type Project = {
	__typename?: 'Project';
	_id?: Maybe<Scalars['ID']['output']>;
	articles?: Maybe<Array<Maybe<Article>>>;
	backend: BackendConfig;
	createdBy: User;
	description?: Maybe<Scalars['String']['output']>;
	frontend: FrontendConfig;
	installScripts?: Maybe<InstallScripts>;
	kanban?: Maybe<Kanban>;
	title: Scalars['String']['output'];
};

export type Query = {
	__typename?: 'Query';
	allArticles?: Maybe<Array<Maybe<Article>>>;
	allProjects?: Maybe<Array<Maybe<Project>>>;
	findArticle?: Maybe<Article>;
	findProject?: Maybe<Project>;
	searchProject?: Maybe<Project>;
};

export type QueryFindArticleArgs = {
	_id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryFindProjectArgs = {
	_id?: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySearchProjectArgs = {
	_id?: InputMaybe<Scalars['ID']['input']>;
	title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
	__typename?: 'User';
	_id?: Maybe<Scalars['ID']['output']>;
	articles?: Maybe<Array<Maybe<Article>>>;
	email: Scalars['String']['output'];
	passwordHash: Scalars['String']['output'];
	projects?: Maybe<Array<Maybe<Project>>>;
	username: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Article: ResolverTypeWrapper<Article>;
	ArticleInput: ArticleInput;
	BackendConfig: ResolverTypeWrapper<BackendConfig>;
	BackendConfigInput: BackendConfigInput;
	BackendEnv: BackendEnv;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
	CMS: Cms;
	Database: Database;
	FrontFrame: FrontFrame;
	FrontendConfig: ResolverTypeWrapper<FrontendConfig>;
	FrontendConfigInput: FrontendConfigInput;
	ID: ResolverTypeWrapper<Scalars['ID']['output']>;
	InstallScripts: ResolverTypeWrapper<InstallScripts>;
	InstallScriptsInput: InstallScriptsInput;
	Kanban: ResolverTypeWrapper<Kanban>;
	KanbanInput: KanbanInput;
	ModuleType: ModuleType;
	Mutation: ResolverTypeWrapper<{}>;
	Packages: Packages;
	Project: ResolverTypeWrapper<Project>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']['output']>;
	User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Article: Article;
	ArticleInput: ArticleInput;
	BackendConfig: BackendConfig;
	BackendConfigInput: BackendConfigInput;
	Boolean: Scalars['Boolean']['output'];
	FrontendConfig: FrontendConfig;
	FrontendConfigInput: FrontendConfigInput;
	ID: Scalars['ID']['output'];
	InstallScripts: InstallScripts;
	InstallScriptsInput: InstallScriptsInput;
	Kanban: Kanban;
	KanbanInput: KanbanInput;
	Mutation: {};
	Project: Project;
	Query: {};
	String: Scalars['String']['output'];
	User: User;
};

export type ArticleResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article'],
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	externalLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	linkedProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
	text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackendConfigResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['BackendConfig'] = ResolversParentTypes['BackendConfig'],
> = {
	cms?: Resolver<Maybe<ResolversTypes['CMS']>, ParentType, ContextType>;
	database?: Resolver<Maybe<ResolversTypes['Database']>, ParentType, ContextType>;
	environment?: Resolver<ResolversTypes['BackendEnv'], ParentType, ContextType>;
	gqlServer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	moduleType?: Resolver<Maybe<ResolversTypes['ModuleType']>, ParentType, ContextType>;
	packages?: Resolver<Array<ResolversTypes['Packages']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FrontendConfigResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['FrontendConfig'] = ResolversParentTypes['FrontendConfig'],
> = {
	framework?: Resolver<Maybe<ResolversTypes['FrontFrame']>, ParentType, ContextType>;
	gqlClient?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	packages?: Resolver<Array<ResolversTypes['Packages']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstallScriptsResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['InstallScripts'] = ResolversParentTypes['InstallScripts'],
> = {
	backend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	frontend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KanbanResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Kanban'] = ResolversParentTypes['Kanban'],
> = {
	_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	backlog?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
	createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	doing?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
	done?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
	project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
	todo?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
	addInstallScript?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		RequireFields<MutationAddInstallScriptArgs, '_id'>
	>;
	createArticle?: Resolver<
		Maybe<ResolversTypes['Article']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateArticleArgs, 'createdBy' | 'text' | 'title'>
	>;
	createProject?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateProjectArgs, 'backend' | 'createdBy' | 'frontend' | 'title'>
	>;
	createUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>
	>;
	deleteArticle?: Resolver<
		Maybe<ResolversTypes['Article']>,
		ParentType,
		ContextType,
		RequireFields<MutationDeleteArticleArgs, '_id'>
	>;
	deleteProject?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		RequireFields<MutationDeleteProjectArgs, '_id'>
	>;
	editProject?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		RequireFields<MutationEditProjectArgs, '_id'>
	>;
};

export type ProjectResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
	backend?: Resolver<ResolversTypes['BackendConfig'], ParentType, ContextType>;
	createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	frontend?: Resolver<ResolversTypes['FrontendConfig'], ParentType, ContextType>;
	installScripts?: Resolver<Maybe<ResolversTypes['InstallScripts']>, ParentType, ContextType>;
	kanban?: Resolver<Maybe<ResolversTypes['Kanban']>, ParentType, ContextType>;
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
	allArticles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
	allProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
	findArticle?: Resolver<
		Maybe<ResolversTypes['Article']>,
		ParentType,
		ContextType,
		Partial<QueryFindArticleArgs>
	>;
	findProject?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		Partial<QueryFindProjectArgs>
	>;
	searchProject?: Resolver<
		Maybe<ResolversTypes['Project']>,
		ParentType,
		ContextType,
		Partial<QuerySearchProjectArgs>
	>;
};

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
	_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
	username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Article?: ArticleResolvers<ContextType>;
	BackendConfig?: BackendConfigResolvers<ContextType>;
	FrontendConfig?: FrontendConfigResolvers<ContextType>;
	InstallScripts?: InstallScriptsResolvers<ContextType>;
	Kanban?: KanbanResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Project?: ProjectResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};
