import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
// import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import https from 'https';

export const paystack = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		console.log(requestBody);

		// request body from the clients
		const email = requestBody.email;
		const amount = requestBody.amount;
		// params
		const params = JSON.stringify({
			email: email,
			amount: amount * 100,
			currency: 'GHS',
			mobile_money: {
				phone: '0201081503',
				provider: 'Vodafone',
			},
		});
		// options
		const options = {
			hostname: 'api.paystack.co',
			port: 443,
			path: '/transaction/initialize',
			method: 'POST',
			headers: {
				Authorization:
					'Bearer sk_test_665fe1bf0bbd9350749133ffc46509c32b52b899', // where you place your secret key copied from your dashboard
				'Content-Type': 'application/json',
			},
		};
		// client request to paystack API
		const clientReq = https
			.request(options, (apiRes) => {
				let data = '';
				apiRes.on('data', (chunk) => {
					data += chunk;
				});
				apiRes.on('end', () => {
					console.log(JSON.parse(data));
					return res.status(STATUS.OK).json({
						code: 'PAYMENT',
						message: 'Payment intent',
						type: 'success',
						data: JSON.parse(data),
					});
				});
			})
			.on('error', (error) => {
				console.error(error);
			});
		clientReq.write(params);
		clientReq.end();
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
