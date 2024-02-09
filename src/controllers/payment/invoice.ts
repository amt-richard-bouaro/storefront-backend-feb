import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
// import path from 'path';
// import ejs from 'ejs';
import { getCapturedOrder } from '../../services/Paypal/payPalApi';
import { emailInvoices } from '../../views/emailTemplates';

export const sendInvoice = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const invoice = {
			customerName: 'Caleb Yankah',
			customerEmail: 'ghetrich370@gmail.com',
			items: [
				{
					id: 'd35a168e-8642-4b42-bbb1-b422def858dd',
					quantity: 4,
					price: 7.99,
					discount: 10,
					total: 28.76,
					name: 'name',
					image:
						'https://store-front-aug.s3.us-east-1.amazonaws.com/STRFRNTSMES-3422-STRFRNTSMES-52105-pexels-jimmy-jimmy-1484801.jpg',
					product: 'a50d6072-fb9e-4e7f-98ce-488d92694fda',
					order: 'c2fdc252-0ab4-4c17-b169-937c15aed163',
				},
				{
					id: 'd35a168e-8642-4b42-bbb1-b422def858dd',
					quantity: 2,
					price: 7.99,
					discount: 10,
					total: 18.76,
					name: 'name',
					image:
						'https://store-front-aug.s3.us-east-1.amazonaws.com/STRFRNTSMES-3422-STRFRNTSMES-52105-pexels-jimmy-jimmy-1484801.jpg',
					product: 'a50d6072-fb9e-4e7f-98ce-488d92694fda',
					order: 'c2fdc252-0ab4-4c17-b169-937c15aed163',
				},
			],
			total: parseInt('200.5').toFixed(2),
			status: 'Delivered',
			shipping: {
				id: '11656160-83cd-4f23-9ced-ff1c64450542',
				countryCode: 'USA',
				postalCode: '022338',
				name: 'Caleb Yankah',
				streetAddress: 'Streen 9',
				apartmentNo: 'N/A',
				city: 'Texas',
				phone: '23346484009',
				isActive: true,
				customer: '5d575ae5-68d4-49b3-9a41-a078322c6a49',
			},
			paid: true,
			currency: 'USD',
			orderID: 'KSU6722GSY382323',

			payer: {
				givenName: 'payer 1',
				surname: 'Loaner',
				email: 'email@example.com',
			},
		};

		if (invoice) {
			const invoiceData = emailInvoices(invoice);

			await sendMail(
				mailOptions({
					to: 'ghetrich370@gmail.com',
					subject: 'Order Notification',
					html: invoiceData,
				}),
				(err) => {
					if (err) {
						//
					}
				}
			);
		}

		const info = await getCapturedOrder('9F2530559W1984603');

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PAYMENT_INFO_FOUND.CODE,
			message: STORE_MSG.PAYMENT_INFO_FOUND.MESSAGE,
			type: 'success',
			data: info.json.payer,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
