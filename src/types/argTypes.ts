import { Request, Response } from 'express';
import { BackendConfig, FrontendConfig, User } from '../types';

export interface BaseArgs {
	_id: string;
}

export interface EditProjectArgs extends BaseArgs {
	title: string;
	description: string;
	createdBy: string;
}

export interface CreateProjectArgs extends EditProjectArgs {
	frontend: FrontendConfig;
	backend: BackendConfig;
}

export interface CreateArticleArgs {
	title: string;
	text: string;
	tags?: string[];
	imageUrl?: string;
	externalLink?: string;
	createdBy: string;
}

export interface EditArticleArgs {
	_id: string;
	title?: string;
	text?: string;
	tags?: string[];
	imageUrl?: string;
	externalLink?: string;
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

export interface EditUserArgs extends BaseArgs {
	username: string;
	email: string;
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
	req: Response;
	res: Request;
}
