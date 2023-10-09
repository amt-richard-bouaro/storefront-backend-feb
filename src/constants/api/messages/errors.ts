export const ERROR_MSG = {
	UNAUTHORIZED: {
		CODE: 'UNAUTHORIZED',
		MESSAGE: 'You are not authorized to access this resource.',
	},
	FORBIDDEN: {
		CODE: 'FORBIDDEN',
		MESSAGE: 'You do not have permission to perform this action.',
	},
	INVALID_REQUEST: {
		CODE: 'INVALID_REQUEST',
		MESSAGE: 'The request is invalid.',
	},
	THIRD_PARTY_INVALID__REQUEST: {
		CODE: 'INVALID_REQUEST',
		MESSAGE:
			'Your account is registered with third party service hence, we cannot honour the request.',
	},
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'An internal server error occurred.',
	},
};
