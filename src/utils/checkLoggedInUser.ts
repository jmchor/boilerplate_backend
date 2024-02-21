import { GraphQLError } from 'graphql';
import { User } from '../types';

export const checkLoggedInUser = (currentUser: User) => {
	if (!currentUser) {
		throw new GraphQLError('You must be logged in to perform this action', {
			extensions: {
				code: 'UNAUTHENTICATED',
			},
		});
	}
};
