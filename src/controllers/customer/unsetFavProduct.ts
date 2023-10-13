import { CUSTOMER_MSG } from './../../constants/api/messages/customer';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { VIEW_PRODUCTS } from '../../validations/customer';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { setProductAsLiked } from '../../services/app/customer/viewedProducts';

export const unsetLikedProduct = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		VIEW_PRODUCTS.parse(requestBody);

		const customerID = req.params.customer_id;
		const productID = req.params.product_id;

		const customer = await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const unliked = await setProductAsLiked({
			customerID,
			product: productID,
			liked: true,
		});

		if (!unliked) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.INFORMATION_UPDATE_FAILED.CODE,
				message: CUSTOMER_MSG.INFORMATION_UPDATE_FAILED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.INFORMATION_UPDATED_SUCCESSFULLY.CODE,
			message: CUSTOMER_MSG.INFORMATION_UPDATED_SUCCESSFULLY.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
