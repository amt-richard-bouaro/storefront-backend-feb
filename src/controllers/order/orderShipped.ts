import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findOrderById } from '../../services/app/order/findOrder';
import { ORDER_MSG } from '../../constants/api/messages';
import { getCapturedOrder } from '../../services/Paypal/payPalApi';
import { setOrderStatus } from '../../services/app/order/setOrderStatus';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import logger from '../../middlewares/logger';
import ejs from 'ejs';
import path from 'path';

export const orderShipped = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.order_id;

		const order = await findOrderById(orderID, {}, ['Processing']);

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE + ' Or the order is in processing',
				type: 'error',
			});
		}

		const changeOrderStatus = await setOrderStatus(order.id, 'Shipped');

		if (!changeOrderStatus) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_SHIPPED.CODE,
				message: ORDER_MSG.NOT_SHIPPED.MESSAGE,
				type: 'error',
			});
		}

		const updatedOrder = await findOrderById(orderID, {
			items: true,
			customerOrder: true,
			storeOrder: true,
			orderShipping: true,
		});

		const paymentInfo = await getCapturedOrder(order.orderId);

		const payer =
			paymentInfo.status === 200
				? {
						email: paymentInfo.json.payer.email_address,
						givenName: paymentInfo.json.payer.name.given_name,
						surname: paymentInfo.json.payer.name.surname,
				  }
				: null;

		const invoice = updatedOrder
			? {
					customerName: `${updatedOrder.customerOrder?.firstName} ${updatedOrder.customerOrder?.lastName}`,
					customerEmail: updatedOrder.customerOrder?.customerAccount?.email,
					items: updatedOrder.items,
					total: updatedOrder.amount,
					status: updatedOrder.status,
					shipping: updatedOrder.orderShipping,
					paid: updatedOrder.paid,
					currency: updatedOrder.currency,
					orderID: updatedOrder.orderId,
					payer,
			  }
			: null;

		if (invoice) {
			const invoiceData = await ejs.renderFile(
				path.resolve('src/views/templates/invoice.ejs'),
				{
					data: invoice,
				}
			);

			await sendMail(
				mailOptions({
					to: invoice.customerEmail!,
					subject: 'Order Notification',
					html: invoiceData,
				}),
				(err) => {
					if (err) {
						logger.error(err);
					}
				}
			);
		}

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.SHIPPED.CODE,
			message: ORDER_MSG.SHIPPED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
