import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { CHANGE_SHIPPING } from '../../validations/order';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { findOrderById } from '../../services/app/order/findOrder';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const changeOrderShipping = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CHANGE_SHIPPING.parse(req.body);

		const requestBody = <CHANGE_SHIPPING>req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const orderID = req.params.order_id;

		const customer = await findCustomerById(id);

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'CUSTOMER_NOT_FOUND',
				message: 'Could not find customer',
				type: 'error',
			});
		}

		const order = await findOrderById(orderID);

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDER_NOT_FOUND',
				message: 'Could not find order',
				type: 'error',
			});
		}

		const shipping = await Database.shipping.findFirst({
			where: {
				id: requestBody.shipping,
			},
		});

		if (!shipping) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'SHIPPING_NOT_FOUND',
				message: 'Could not find shipping details.',
				type: 'error',
			});
		}

		const updateOrderShipping = await Database.order.update({
			where: {
				id: order.id,
			},
			data: {
				shipping: shipping.id,
			},
			include: {
				orderShipping: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ORDER_SHIPPING_UPDATED',
			message: 'Your order has been updated',
			type: 'success',
			data: updateOrderShipping,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
