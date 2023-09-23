import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
// import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

import { captureOrder } from '../../../services/Paypal/payPalApi';

export const approveOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.orderID;

		const response = await captureOrder(orderID);

		console.log(response.json, response.status);

		return res.status(STATUS.OK).json({
			code: 'PAYMENT',
			message: 'Payment intent',
			type: 'success',
			data: response.json,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
