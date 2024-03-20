import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  externalLink?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  linkedProjects?: Maybe<Array<Maybe<Project>>>;
  subheadline?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ArticleInput = {
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  externalLink?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  linkedProjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  subheadline?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Authenticationstatus = {
  __typename?: 'Authenticationstatus';
  cookieIsPresent?: Maybe<Scalars['Boolean']['output']>;
};

export type BackendConfig = {
  __typename?: 'BackendConfig';
  cms?: Maybe<Cms>;
  database?: Maybe<Database>;
  environment?: Maybe<BackendEnv>;
  gqlServer?: Maybe<Scalars['Boolean']['output']>;
  moduleType?: Maybe<ModuleType>;
  packages?: Maybe<Array<Maybe<Packages>>>;
};

export type BackendConfigInput = {
  cms?: InputMaybe<Cms>;
  database?: InputMaybe<Database>;
  environment?: InputMaybe<BackendEnv>;
  gqlServer?: InputMaybe<Scalars['Boolean']['input']>;
  moduleType?: InputMaybe<ModuleType>;
  packages?: InputMaybe<Array<InputMaybe<Packages>>>;
};

export enum BackendEnv {
  NodeExpressJs = 'nodeExpressJS',
  NodeExpressTs = 'nodeExpressTS',
  Nodejs = 'nodejs',
  Nodets = 'nodets'
}

export enum Cms {
  KeystoneJs = 'keystoneJS',
  Strapi = 'strapi'
}

export enum Database {
  Mongodb = 'mongodb',
  Postgres = 'postgres'
}

export enum FrontFrame {
  Nextjs = 'nextjs',
  Reactjs = 'reactjs',
  Reactts = 'reactts',
  Vanillajs = 'vanillajs'
}

export type FrontendConfig = {
  __typename?: 'FrontendConfig';
  framework?: Maybe<FrontFrame>;
  gqlClient?: Maybe<Scalars['Boolean']['output']>;
  packages?: Maybe<Array<Maybe<Packages>>>;
};

export type FrontendConfigInput = {
  framework?: InputMaybe<FrontFrame>;
  gqlClient?: InputMaybe<Scalars['Boolean']['input']>;
  packages?: InputMaybe<Array<InputMaybe<Packages>>>;
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
  backlog?: Maybe<Array<Maybe<KanbanCard>>>;
  createdBy: User;
  doing?: Maybe<Array<Maybe<KanbanCard>>>;
  done?: Maybe<Array<Maybe<KanbanCard>>>;
  project: Project;
  todo?: Maybe<Array<Maybe<KanbanCard>>>;
};

export type KanbanCard = {
  __typename?: 'KanbanCard';
  title?: Maybe<Scalars['String']['output']>;
};

export type KanbanCardInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type KanbanInput = {
  backlog?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  doing?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  done?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  project?: InputMaybe<Scalars['ID']['input']>;
  todo?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
};

export type LoginInput = {
  input?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  loggedOut?: Maybe<Scalars['Boolean']['output']>;
};

export enum ModuleType {
  Commonjs = 'commonjs',
  Module = 'module'
}

export type Mutation = {
  __typename?: 'Mutation';
  addInstallScript?: Maybe<Project>;
  createArticle?: Maybe<Article>;
  createKanban?: Maybe<Kanban>;
  createProject?: Maybe<Project>;
  createUser?: Maybe<User>;
  deleteArticle?: Maybe<Scalars['Boolean']['output']>;
  deleteKanban?: Maybe<Scalars['Boolean']['output']>;
  deleteProject?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  editArticle?: Maybe<Article>;
  editKanban?: Maybe<Kanban>;
  editProject?: Maybe<Project>;
  editUser?: Maybe<User>;
  linkArticleToProject?: Maybe<Article>;
  login?: Maybe<Token>;
  logout?: Maybe<LogoutResponse>;
  updatePassword?: Maybe<User>;
};


export type MutationAddInstallScriptArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationCreateArticleArgs = {
  createdBy: Scalars['ID']['input'];
  externalLink?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  linkedProjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  subheadline?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateKanbanArgs = {
  backlog?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  createdBy: Scalars['ID']['input'];
  doing?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  done?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  project: Scalars['ID']['input'];
  todo?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
};


export type MutationCreateProjectArgs = {
  articles?: InputMaybe<Array<InputMaybe<ArticleInput>>>;
  backend: BackendConfigInput;
  createdBy: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  frontend: FrontendConfigInput;
  installScripts?: InputMaybe<InstallScriptsInput>;
  kanban?: InputMaybe<KanbanInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
};


export type MutationDeleteKanbanArgs = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};


export type MutationEditArticleArgs = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
  externalLink?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  subheadline?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditKanbanArgs = {
  _id: Scalars['ID']['input'];
  backlog?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  doing?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  done?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
  todo?: InputMaybe<Array<InputMaybe<KanbanCardInput>>>;
};


export type MutationEditProjectArgs = {
  _id: Scalars['ID']['input'];
  createdBy: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditUserArgs = {
  _id: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLinkArticleToProjectArgs = {
  _id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationUpdatePasswordArgs = {
  _id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
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
  Typescript = 'typescript'
}

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['ID']['output']>;
  articles?: Maybe<Array<Maybe<Article>>>;
  backend?: Maybe<BackendConfig>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  frontend?: Maybe<FrontendConfig>;
  installScripts?: Maybe<InstallScripts>;
  kanban?: Maybe<Kanban>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allArticles?: Maybe<Array<Maybe<Article>>>;
  allProjects?: Maybe<Array<Maybe<Project>>>;
  allTags?: Maybe<Array<Maybe<TagWithType>>>;
  allTitles?: Maybe<Array<Maybe<Title>>>;
  checkAuthentication: Authenticationstatus;
  currentUser?: Maybe<User>;
  findArticle?: Maybe<Article>;
  findKanban?: Maybe<Kanban>;
  findProject?: Maybe<Project>;
  myProjects?: Maybe<Array<Maybe<Project>>>;
  searchArticleByTitle?: Maybe<Scalars['ID']['output']>;
  searchArticlesByTag?: Maybe<Array<Maybe<Article>>>;
  searchProject?: Maybe<Scalars['ID']['output']>;
  searchProjectsByTag?: Maybe<Array<Maybe<Project>>>;
};


export type QueryAllArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindArticleArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindKanbanArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindProjectArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArticleByTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchArticlesByTagArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchProjectArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchProjectsByTagArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type TagWithType = {
  __typename?: 'TagWithType';
  tag?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Title = {
  __typename?: 'Title';
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  isAuthenticated?: Maybe<Scalars['Boolean']['output']>;
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  articles?: Maybe<Array<Maybe<Article>>>;
  email: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  likedArticles?: Maybe<Array<Maybe<Article>>>;
  passwordHash: Scalars['String']['output'];
  projects?: Maybe<Array<Maybe<Project>>>;
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Authenticationstatus: ResolverTypeWrapper<Authenticationstatus>;
  BackendConfig: ResolverTypeWrapper<BackendConfig>;
  BackendConfigInput: BackendConfigInput;
  BackendEnv: BackendEnv;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CMS: Cms;
  Database: Database;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FrontFrame: FrontFrame;
  FrontendConfig: ResolverTypeWrapper<FrontendConfig>;
  FrontendConfigInput: FrontendConfigInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  InstallScripts: ResolverTypeWrapper<InstallScripts>;
  InstallScriptsInput: InstallScriptsInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Kanban: ResolverTypeWrapper<Kanban>;
  KanbanCard: ResolverTypeWrapper<KanbanCard>;
  KanbanCardInput: KanbanCardInput;
  KanbanInput: KanbanInput;
  LoginInput: LoginInput;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  ModuleType: ModuleType;
  Mutation: ResolverTypeWrapper<{}>;
  Packages: Packages;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TagWithType: ResolverTypeWrapper<TagWithType>;
  Title: ResolverTypeWrapper<Title>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  ArticleInput: ArticleInput;
  Authenticationstatus: Authenticationstatus;
  BackendConfig: BackendConfig;
  BackendConfigInput: BackendConfigInput;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  FrontendConfig: FrontendConfig;
  FrontendConfigInput: FrontendConfigInput;
  ID: Scalars['ID']['output'];
  InstallScripts: InstallScripts;
  InstallScriptsInput: InstallScriptsInput;
  Int: Scalars['Int']['output'];
  Kanban: Kanban;
  KanbanCard: KanbanCard;
  KanbanCardInput: KanbanCardInput;
  KanbanInput: KanbanInput;
  LoginInput: LoginInput;
  LogoutResponse: LogoutResponse;
  Mutation: {};
  Project: Project;
  Query: {};
  String: Scalars['String']['output'];
  TagWithType: TagWithType;
  Title: Title;
  Token: Token;
  User: User;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  externalLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  subheadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationstatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Authenticationstatus'] = ResolversParentTypes['Authenticationstatus']> = {
  cookieIsPresent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackendConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['BackendConfig'] = ResolversParentTypes['BackendConfig']> = {
  cms?: Resolver<Maybe<ResolversTypes['CMS']>, ParentType, ContextType>;
  database?: Resolver<Maybe<ResolversTypes['Database']>, ParentType, ContextType>;
  environment?: Resolver<Maybe<ResolversTypes['BackendEnv']>, ParentType, ContextType>;
  gqlServer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  moduleType?: Resolver<Maybe<ResolversTypes['ModuleType']>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Packages']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FrontendConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['FrontendConfig'] = ResolversParentTypes['FrontendConfig']> = {
  framework?: Resolver<Maybe<ResolversTypes['FrontFrame']>, ParentType, ContextType>;
  gqlClient?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Packages']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstallScriptsResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstallScripts'] = ResolversParentTypes['InstallScripts']> = {
  backend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KanbanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Kanban'] = ResolversParentTypes['Kanban']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  backlog?: Resolver<Maybe<Array<Maybe<ResolversTypes['KanbanCard']>>>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  doing?: Resolver<Maybe<Array<Maybe<ResolversTypes['KanbanCard']>>>, ParentType, ContextType>;
  done?: Resolver<Maybe<Array<Maybe<ResolversTypes['KanbanCard']>>>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  todo?: Resolver<Maybe<Array<Maybe<ResolversTypes['KanbanCard']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KanbanCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['KanbanCard'] = ResolversParentTypes['KanbanCard']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']> = {
  loggedOut?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addInstallScript?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationAddInstallScriptArgs, '_id'>>;
  createArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'createdBy' | 'text' | 'title'>>;
  createKanban?: Resolver<Maybe<ResolversTypes['Kanban']>, ParentType, ContextType, RequireFields<MutationCreateKanbanArgs, 'createdBy' | 'project'>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'backend' | 'createdBy' | 'frontend' | 'title'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  deleteArticle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, '_id' | 'createdBy'>>;
  deleteKanban?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteKanbanArgs, '_id' | 'createdBy'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, '_id' | 'createdBy'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, '_id' | 'password'>>;
  editArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationEditArticleArgs, '_id' | 'createdBy'>>;
  editKanban?: Resolver<Maybe<ResolversTypes['Kanban']>, ParentType, ContextType, RequireFields<MutationEditKanbanArgs, '_id'>>;
  editProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationEditProjectArgs, '_id' | 'createdBy'>>;
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, '_id'>>;
  linkArticleToProject?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationLinkArticleToProjectArgs, '_id' | 'projectId'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>;
  logout?: Resolver<Maybe<ResolversTypes['LogoutResponse']>, ParentType, ContextType>;
  updatePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, '_id' | 'newPassword' | 'oldPassword'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
  backend?: Resolver<Maybe<ResolversTypes['BackendConfig']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontend?: Resolver<Maybe<ResolversTypes['FrontendConfig']>, ParentType, ContextType>;
  installScripts?: Resolver<Maybe<ResolversTypes['InstallScripts']>, ParentType, ContextType>;
  kanban?: Resolver<Maybe<ResolversTypes['Kanban']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allArticles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType, Partial<QueryAllArticlesArgs>>;
  allProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType, Partial<QueryAllProjectsArgs>>;
  allTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['TagWithType']>>>, ParentType, ContextType>;
  allTitles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Title']>>>, ParentType, ContextType>;
  checkAuthentication?: Resolver<ResolversTypes['Authenticationstatus'], ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  findArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, Partial<QueryFindArticleArgs>>;
  findKanban?: Resolver<Maybe<ResolversTypes['Kanban']>, ParentType, ContextType, Partial<QueryFindKanbanArgs>>;
  findProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, Partial<QueryFindProjectArgs>>;
  myProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  searchArticleByTitle?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<QuerySearchArticleByTitleArgs>>;
  searchArticlesByTag?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType, Partial<QuerySearchArticlesByTagArgs>>;
  searchProject?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<QuerySearchProjectArgs>>;
  searchProjectsByTag?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType, Partial<QuerySearchProjectsByTagArgs>>;
};

export type TagWithTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagWithType'] = ResolversParentTypes['TagWithType']> = {
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TitleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Title'] = ResolversParentTypes['Title']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  isAuthenticated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likedArticles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>;
  Authenticationstatus?: AuthenticationstatusResolvers<ContextType>;
  BackendConfig?: BackendConfigResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FrontendConfig?: FrontendConfigResolvers<ContextType>;
  InstallScripts?: InstallScriptsResolvers<ContextType>;
  Kanban?: KanbanResolvers<ContextType>;
  KanbanCard?: KanbanCardResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TagWithType?: TagWithTypeResolvers<ContextType>;
  Title?: TitleResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

