import { GraphQLError } from 'graphql';
import { compareSync } from 'bcrypt-ts';

export const passwordValidation = (password: string, passwordHash: string) => {
	const isValidPassword = compareSync(password, passwordHash);

	if (!isValidPassword) {
		throw new GraphQLError('Invalid password', {
			extensions: {
				code: 'INVALID_INPUT',
				invalidArgs: password,
			},
		});
	}
};
