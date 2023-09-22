import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { NEW_PRODUCT } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const addProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_PRODUCT>req.body;

		const body = {
			price: parseFloat(req.body.price),
			name: req.body.name,
			quantity: parseFloat(req.body.quantity),
			description: req.body.description,
			isActive: true,
			category: req.body.category,
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

		const variations = requestBody.variations
			? requestBody.variations.map((variation) => {
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
