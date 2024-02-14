import { CUSTOMER_MSG } from './../../constants/api/messages/customer';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { VIEW_PRODUCTS } from '../../validations/customer';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import {
	findCustomerSavedProducts,
	setProductAsLiked,
} from '../../services/app/customer/viewedProducts';

export const removeLikedProduct = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		VIEW_PRODUCTS.parse(requestBody);

		const customerID = req.params.customer_id;

		const customerProducts = <VIEW_PRODUCTS>requestBody;

		const customer = await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const savedProducts = await findCustomerSavedProducts(customer.id);

		let updateCount = 0;

		for (const product of customerProducts.products) {
			const alreadySavedProduct = savedProducts.find(
				(item) => item.savedProduct.id === product
			);

			if (alreadySavedProduct) {
				const updated = await setProductAsLiked({
					customerID: customer.id,
					product,
					liked: false,
				});

				if (updated && updated.count > 0) {
					updateCount = updateCount + 1;
				}
			}
		}

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_REMOVED',
			message:
				updateCount > 0
					? 'Products removed successfully'
					: '0 products were removed',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
