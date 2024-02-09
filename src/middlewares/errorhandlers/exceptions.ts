import { Request, Response } from 'express';
import { STATUS } from '../../config/statusCode';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MulterError } from 'multer';
import { SERVER_CONFIG } from '../../config';

export const notFoundError = (req: Request, res: Response) => {
	return res.status(STATUS.NOT_FOUND).json({
		code: 'NOT_FOUND',
		message: 'The specified route does not exist at ' + req.originalUrl,
		type: 'error',
	});
};

export const errorHandler = <T extends Error>(
	err: T,
	req: Request,
	res: Response
) => {
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

	if (err instanceof MulterError) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: 'FILE_UPLOAD_ERROR',
			message: err.message,
			type: 'error',
			error: err.cause,
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
	if (err.name === 'MulterError' || err instanceof MulterError) {
		status = STATUS.BAD_REQUEST;
		errorResponse = {
			...errorResponse,
			message: err.message,
			code: 'MULTER_ERROR',
		};
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: `DB_ERROR_${err.code}`,
			message: err.message,
			type: 'error',
			error: err.meta,
		});
	}

	if (err.name === 'PrismaClientKnownRequestError') {
		return res.status(STATUS.BAD_REQUEST).json({
			code: `DB_ERROR_`,
			message: err.cause,
			type: 'error',
			error: err,
		});
	}

	if (err instanceof Prisma.PrismaClientInitializationError) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: `DB_ERROR_${err.errorCode}`,
			message: err.message,
			type: 'error',
			stack: SERVER_CONFIG.NODE_ENV !== 'production' && err.stack,
		});
	}

	if (
		err instanceof Prisma.PrismaClientValidationError ||
		err instanceof Prisma.PrismaClientRustPanicError
	) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: `DB_ERROR`,
			message: err.message,
			type: 'error',
			stack: SERVER_CONFIG.NODE_ENV !== 'production' && err.stack,
		});
	}

	if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		return res.status(STATUS.BAD_REQUEST).json({
			code: `DB_ERROR_${err.batchRequestIdx}`,
			message: err.message,
			type: 'error',
			stack: SERVER_CONFIG.NODE_ENV !== 'production' && err.stack,
		});
	}

	return res.status(status).json(errorResponse);
};
