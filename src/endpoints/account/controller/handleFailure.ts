import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';

export const handleFailure = (req: Request, res: Response<RESPONSE>) => {
	return res.status(STATUS.UNAUTHORIZED).json({
		code: 'UNAUTHORIZED',
		message: 'Authentication failed! Please try again',
		type: 'error',
	});
};
