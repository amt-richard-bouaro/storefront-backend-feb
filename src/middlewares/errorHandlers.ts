import { Request, Response } from 'express';
import { RESPONSE } from '../services/generalTypes';
import { SERVER_CONFIG, STATUS } from '../config/main';
import { z } from 'zod';

export const notFoundError = (req: Request, res: Response<RESPONSE>) => {
	return res.status(STATUS.NOT_FOUND).json({
		code: 'NOT_FOUND',
		message: 'The specified route does not exist at ' + req.originalUrl,
		type: 'error',
	});
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
	let status =
		res.statusCode === 200 ? STATUS.INTERNAL_SERVER_ERROR : res.statusCode;

	let errorResponse = {
		code: 'ERROR',
		message: err.message,
		type: 'error',
		stack: SERVER_CONFIG.NODE_ENV !== 'production' && err.stack,
	};

	if (err instanceof z.ZodError) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: 'VALIDATION_ERROR',
			message: 'Parameters failed validation',
			type: 'error',
			error: err.errors,
		});
	}

	if (err.name === 'TokenExpiredError') {
		status = STATUS.UNAUTHORIZED;
		errorResponse = {
			...errorResponse,
			message: 'Unauthorized: Token has expired',
			code: 'TOKEN_EXPIRED',
		};
	}

	return res.status(status).json(errorResponse);
};
