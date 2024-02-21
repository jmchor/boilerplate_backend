import { GraphQLError } from 'graphql';
import { User } from '../types';

export const checkUserIsAuthor = (currentUser: User, createdBy: string) => {
	if (currentUser._id.toString() !== createdBy) {
		throw new GraphQLError('You are not authorized to perform this action', {
			extensions: {
				code: 'UNAUTHORIZED',
			},
		});
	}
};
