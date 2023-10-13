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
	findCustomerSavedProducts,
	setProductAsLiked,
} from '../../services/app/customer/viewedProducts';

export const setLikedProduct = async (
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

		const productsToAdd: {
			product: string;
			customer: string;
			store: string;
			liked: boolean;
		}[] = [];

		const savedProducts = await findCustomerSavedProducts(customer.id);

		for (const product of customerProducts.products) {
			const availableProduct = await findProductById(product, {});

			const alreadySavedProduct = savedProducts.find(
				(item) => item.savedProduct.id === product
			);

			if (alreadySavedProduct) {
				const liked = alreadySavedProduct.liked === false ? true : false;
				await setProductAsLiked({
					customerID: customer.id,
					product,
					liked,
				});
			} else {
				availableProduct &&
					productsToAdd.push({
						product: availableProduct.id,
						customer: customer.id,
						store: availableProduct.store,
						liked: true,
					});
			}
		}

		productsToAdd.length > 0 && (await addProductsToFavorite(productsToAdd));

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.PRODUCT_SAVES_UPDATED.CODE,
			message: CUSTOMER_MSG.PRODUCT_SAVES_UPDATED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
