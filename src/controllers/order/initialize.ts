import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { ITEMS_TO_BUY, ITEMS_TO_BUY_TYPE } from '../../validations/order';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { findStoreById } from '../../services/app/store/findStore';
import { productsAvailability } from '../../services/app/product/productAvailable';
import { createOrder } from '../../services/Paypal/payPalApi';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { uuid } from '../../helpers';
import { findShippingDestination } from '../../services/app/order/findOrderDestination';
import {
	CUSTOMER_MSG,
	ORDER_MSG,
	STORE_MSG,
} from '../../constants/api/messages';

export const initializeOrder = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		console.log(req.body);

		const requestBody = <ITEMS_TO_BUY_TYPE>req.body;
		console.log(requestBody.store);

		ITEMS_TO_BUY.parse(requestBody);

		const destination = await findShippingDestination(requestBody.destination);

		if (!destination) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.DESTINATION_NOT_FOUND.CODE,
				message: ORDER_MSG.DESTINATION_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const customerID = req.params.customer_id;

		const customer = await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const shipping =
			customer.shipping &&
			customer.shipping.find(
				(shipping) => shipping.id === requestBody.shipping
			);

		if (shipping === undefined) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.SHIPPING_ADDRESS_NOT_FOUND.CODE,
				message: ORDER_MSG.SHIPPING_ADDRESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const store = await findStoreById(requestBody.store, { products: true });

		if (!store || !store.products) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const storeProducts = store.products ?? [];

		const { unavailbleProducts, availableProducts } = productsAvailability(
			storeProducts,
			requestBody.items
		);

		if (unavailbleProducts.length > 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ORDER_FAILED.CODE,
				message: ORDER_MSG.ORDER_FAILED.MESSAGE,
				type: 'error',
				error: unavailbleProducts,
			});
		}

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
					total: product.total + destination.cost,
					image: product.image,
					variations: {
						connect: product.variations,
					},
				};
			}
		});

		const referenceId = 'STFRNT-' + uuid(10);

		const createdOrder = await createOrder({
			currency: store.currency || 'USD',
			total: orderTotal,
			reference: referenceId,
			shipping: {
				address_line_1: shipping.streetAddress,
				address_line_2: shipping.apartmentNo ?? 'N/A',
				admin_area_2: shipping.city,
				admin_area_1: shipping.phone,
				postal_code: shipping.postalCode,
				country_code: shipping.countryCode,
			},
		});

		if (createdOrder.status !== 200) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
				code: ORDER_MSG.NOT_RETURNED.CODE,
				message: ORDER_MSG.NOT_RETURNED.MESSAGE,
				type: 'error',
			});
		}

		const newOrder = await Database.order.create({
			data: {
				customer: customerID,
				shipping: shipping.id,
				amount: orderTotal + destination.cost,
				orderId: createdOrder.json.id,
				referenceId: referenceId,
				store: store.id,
				items: {
					createMany: {
						data: [...orderData],
					},
				},
				destination: destination.id,
			},
			include: {
				items: true,
				orderShipping: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.PLACED_SUCCESSFULLY.CODE,
			message: ORDER_MSG.PLACED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: newOrder,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
