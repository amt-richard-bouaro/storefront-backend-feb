import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { CHANGE_SHIPPING } from '../../validations/order';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { findOrderById } from '../../services/app/order/findOrder';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { CUSTOMER_MSG, ORDER_MSG } from '../../constants/api/messages';
import { findShippingInfo } from '../../services/app/customer/findShipping';
import { updateOrderShipping } from '../../services/app/order/updateOrderShipping';

export const changeOrderShipping = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CHANGE_SHIPPING.parse(req.body);

		const requestBody = <CHANGE_SHIPPING>req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const orderID = req.params.order_id;

		const customer = await findCustomerById(id, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const order = await findOrderById(orderID);

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const shipping = await findShippingInfo(requestBody.shipping);

		if (!shipping) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.SHIPPING_ADDRESS_NOT_FOUND.CODE,
				message: ORDER_MSG.SHIPPING_ADDRESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatedOrderShipping = await updateOrderShipping(
			order.id,
			shipping.id
		);

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.SHIPPING_ADDRESS_UPDATED.CODE,
			message: ORDER_MSG.SHIPPING_ADDRESS_UPDATED.MESSAGE,
			type: 'success',
			data: updatedOrderShipping,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
