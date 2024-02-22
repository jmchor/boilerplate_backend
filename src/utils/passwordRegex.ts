import { GraphQLError } from 'graphql';

export const inputRegex = (pattern: string, type: 'password' | 'email') => {
	let regex: RegExp;

	if (type === 'password') {
		regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{6,}/;
	} else if (type === 'email') {
		regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	}

	if (!regex.test(pattern) && type === 'password') {
		throw new GraphQLError(
			'Password must be at least 6 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
			{
				extensions: {
					code: 'INVALID_INPUT',
					invalidArgs: pattern,
				},
			}
		);
	} else if (!regex.test(pattern) && type === 'email') {
		throw new GraphQLError('Email address is malformed', {
			extensions: {
				code: 'INVALID_INPUT',
				invalidArgs: pattern,
			},
		});
	}
};
