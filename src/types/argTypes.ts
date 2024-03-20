import { Request, Response } from 'express';
import { BackendConfig, FrontendConfig, User } from '../types';

export interface BaseArgs {
	_id: string;
}

export interface EditProjectArgs extends BaseArgs {
	title: string;
	description: string;
	createdBy: string;
	tags: string[];
}

export interface CreateProjectArgs extends EditProjectArgs {
	frontend: FrontendConfig;
	backend: BackendConfig;
}

export interface CreateArticleArgs {
	title: string;
	text: string;
	subheadline?: string;
	tags?: string[];
	imageUrl?: string;
	externalLink?: string;
	createdBy: string;
}

export interface EditArticleArgs {
	_id: string;
	title?: string;
	text?: string;
	subheadline?: string;
	tags?: string[];
	imageUrl?: string;
	externalLink?: string;
	createdBy: string;
}
export interface CreateKanbanArgs {
	backlog: KanbanArgs[] | null;
	todo: KanbanArgs[] | null;
	doing: KanbanArgs[] | null;
	done: KanbanArgs[] | null;
	createdBy: string;
	project: string;
}

export interface EditKanbanArgs extends BaseArgs {
	backlog: KanbanArgs[] | null;
	todo: KanbanArgs[] | null;
	doing: KanbanArgs[] | null;
	done: KanbanArgs[] | null;
	createdBy: string;
}

export interface DeleteDocument extends BaseArgs {
	createdBy: string;
}

export interface DeleteUser extends BaseArgs {
	password: string;
}

export interface LinkArticleToProject extends BaseArgs {
	projectId: string;
}

export interface LoginInput {
	input: string;
	password: string;
}

export interface CreateUserArgs extends BaseArgs {
	username: string;
	email: string;
	password: string;
	imageUrl?: string;
}

export interface EditUserArgs extends BaseArgs {
	username: string;
	email: string;
	imageUrl?: string;
}

export interface UpdatePasswordArgs extends BaseArgs {
	oldPassword: string;
	newPassword: string;
}

export interface UserContext {
	currentUser: User;
}

export interface Token {
	token: string;
}

export interface ReqResContext {
	req: ReqWithUserAndCookies;
	res: Response;
}

export interface ReqWithUserAndCookies extends Request {
	currentUser?: User;
	cookies: {
		token?: string;
	};
}

export interface KanbanArgs {
	title: string;
}
