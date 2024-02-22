import { BackendConfig, FrontendConfig, User } from '../types';

interface BaseArgs {
	_id: string;
}

interface EditProjectArgs extends BaseArgs {
	title: string;
	description: string;
	createdBy: string;
}

interface CreateProjectArgs extends EditProjectArgs {
	frontend: FrontendConfig;
	backend: BackendConfig;
}

interface ArticleArgs extends BaseArgs {
	title: string;
	text: string;
	imageUrl: string;
	externalLink: string;
	createdBy: string;
}

interface DeleteDocument extends BaseArgs {
	createdBy: string;
}

interface LinkArticleToProject extends BaseArgs {
	projectId: string;
}

interface LoginInput {
	email?: string;
	username?: string;
	password: string;
}

interface EditUserArgs extends BaseArgs {
	username: string;
	email: string;
}

interface UpdatePasswordArgs extends BaseArgs {
	oldPassword: string;
	newPassword: string;
}

interface UserContext {
	currentUser: User;
}

export {
	BaseArgs,
	EditProjectArgs,
	CreateProjectArgs,
	ArticleArgs,
	DeleteDocument,
	LinkArticleToProject,
	LoginInput,
	EditUserArgs,
	UpdatePasswordArgs,
	UserContext,
};
