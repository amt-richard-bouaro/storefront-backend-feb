import { CUSTOMER_MSG } from './../../constants/api/messages/customer';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { VIEW_PRODUCTS } from '../../validations/customer';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findProductById } from '../../services/app/product/findSingleProduct';
import {
	addProductsToFavorite,
	findCustomerSavedProduct,
} from '../../services/app/customer/viewedProducts';

export const addToViews = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		VIEW_PRODUCTS.parse(requestBody);

		const customerID = req.params.customer_id;

		const customer = await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const productsToAdd: {
			product: string;
			customer: string;
			store: string;
		}[] = [];

		for (const product of requestBody.products) {
			const availableProduct = await findProductById(product, {});
			if (availableProduct) {
				const hasAlreadySaved = await findCustomerSavedProduct({
					customer: customer.id,
					product,
				});

				!hasAlreadySaved &&
					productsToAdd.push({
						product: availableProduct.id,
						customer: customerID,
						store: availableProduct.store,
					});
			}
		}

		const result =
			productsToAdd.length > 0 && (await addProductsToFavorite(productsToAdd));

		if (!result) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.PRODUCT_NOT_SAVED.CODE,
				message: CUSTOMER_MSG.PRODUCT_NOT_SAVED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.PRODUCT_SAVED.CODE,
			message: CUSTOMER_MSG.PRODUCT_SAVED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
