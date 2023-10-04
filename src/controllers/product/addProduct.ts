import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { NEW_PRODUCT } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const addProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		const body: NEW_PRODUCT = {
			price: parseFloat(requestBody.price.toString()),
			name: requestBody.name,
			quantity: parseInt(requestBody.quantity.toString()),
			description: requestBody.description,
			isActive: requestBody.isActive === 'true',
			category: requestBody.category,
			variations: JSON.parse(requestBody.variations || '[]'),
		};

		NEW_PRODUCT.parse(body);

		const storeID = req.params.storeID;

		if (!req.files) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PRODUCT_NOT_ADDED',
				message: 'Please add the product images',
				type: 'error',
			});
		}

		const files = req.files as Express.MulterS3.File[];

		const images = files.map((file) => {
			return {
				url: file.location,
				key: file.key,
			};
		});

		const variations = body.variations
			? body.variations.map((variation) => {
					return {
						type: variation.type,
						value: variation.value,
					};
			  })
			: [];

		const product = await Database.product.create({
			data: {
				name: body.name,
				price: body.price,
				quantity: body.quantity,
				category: body.category,
				description: body.description,
				isActive: body.isActive,
				store: storeID,
				variations: {
					createMany: {
						data: variations,
					},
				},
				images: {
					createMany: {
						data: images,
					},
				},
			},
			include: {
				images: true,
				variations: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_ADDED',
			message: 'New product has been successfully added',
			type: 'success',
			data: product,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
