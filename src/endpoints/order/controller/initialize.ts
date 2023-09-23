// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
// import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import {
	// findAccountById,
	findCustomerById,
	findStoreById,
} from '../../utils/operations/readOperations';
import { ITEMS_TO_BUY, ITEMS_TO_BUY_TYPE } from '../types';
import { productsAvailability } from '../../utils/helperFunctions';
import { Database } from '../../../database/dbClient';
import { createOrder } from '../../../services/Paypal/payPalApi';

export const initializeOrder = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	console.log(req.body);

	try {
		ITEMS_TO_BUY.parse(req.body);

		const requestBody = <ITEMS_TO_BUY_TYPE>req.body;

		const customerID = req.params.customerID;

		const customer = await findCustomerById(customerID);

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'CUSTOMER_NOT_FOUND',
				message: 'Could not find customer',
				type: 'error',
			});
		}

		const shipping = customer.shipping.find(
			(shipping) => shipping.id === requestBody.shipping
		);

		if (shipping === undefined) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'SHIPPING_ADDRESS_NOT_FOUND',
				message: "Could not find customer's shipping address",
				type: 'error',
			});
		}

		const store = await findStoreById(requestBody.store);

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'STORE_NOT_FOUND',
				message: 'Could not find store',
				type: 'error',
			});
		}

		const storeProducts = store.products !== undefined ? store.products : [];

		const { unavailbleProducts, availableProducts } = productsAvailability(
			storeProducts,
			requestBody.items
		);

		if (unavailbleProducts.length > 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDER_FAILED',
				message:
					'Could not process order. This may be because products are un available or quantity is insufficient',
				type: 'error',
				error: unavailbleProducts,
			});
		}

		console.log(availableProducts);

		const orderTotal: number = availableProducts.reduce(
			(total, item) => total + item.total,
			0
		);

		const orderData = availableProducts.map((product) => {
			if (product.variations.length === 0) {
				return {
					product: product.product,
					name: product.name,
					price: product.price,
					discount: product.discount,
					quantity: product.quantity,
					total: product.total,
					image: product.image,
				};
			} else {
				return {
					product: product.product,
					name: product.name,
					price: product.price,
					discount: product.discount,
					quantity: product.quantity,
					total: product.total,
					image: product.image,
					variations: {
						connect: product.variations,
					},
				};
			}
		});

		const referenceId = uuidV4().replaceAll('-', '');

		const createdOrder = await createOrder({
			address: {
				countryCode: 'US',
				postalCode: shipping.postalCode,
				streetAddress: shipping.streetAddress,
				appartmentNo: shipping.apartmentNo,
				city: shipping.city,
				phone: shipping.phone,
			},
			total: orderTotal,
			reference: referenceId,
		});

		if (createdOrder.status !== 200) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
				code: 'ORDER_FAILED',
				message: 'Order has failed',
				type: 'error',
			});
		}

		await Database.order.create({
			data: {
				customer: customerID,
				shipping: shipping.id,
				amount: orderTotal,
				orderId: createdOrder.json.id,
				referenceId: referenceId,
				store: store.id,
				items: {
					createMany: {
						data: [...orderData],
					},
				},
			},
			include: {
				items: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ORDER_INITIALIZED',
			message:
				'Order has successfully been initialized. You can proceed to approve payment',
			type: 'success',
			data: createdOrder.json,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
