import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { getTotalRating, groupVariations, setDiscount } from '../../helpers';
import { STORE_MSG } from '../../constants/api/messages';
import { Database } from '../../extensions/dbClient';

export const getProducts = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, {});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}
		const searchQuery = req.query.search?.toString() ?? '';

		const totalCount = await Database.product.count({
			where: {
				deleted: false,
				store: storeID,
				OR: [
					{
						name: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},

					{
						description: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},
					{
						category: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},
				],
			},
		});

		const query = {
			search: req.query.search?.toString() ?? '',
			skip: Number(req.query.page ?? 1),
			take: Number(req.query.records ?? totalCount),
		};

		const storeProducts = await Database.product.findMany({
			where: {
				deleted: false,
				store: storeID,
				OR: [
					{
						name: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},

					{
						description: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},
					{
						category: {
							contains: searchQuery,
							mode: 'insensitive',
						},
					},
				],
			},
			skip: (query.skip - 1) * query.take,
			take: query.take,
			include: {
				variations: true,
				images: {
					select: {
						url: true,
						key: false,
						id: true,
						product: false,
					},
				},
				reviews: {
					select: {
						rating: true,
						remarks: true,
						comment: true,
						createdAt: true,
						customerReview: {
							select: {
								firstName: true,
								lastName: true,
							},
						},
						replies: {
							select: {
								comment: true,
								from: true,
								createdAt: true,
								customerReply: {
									select: {
										firstName: true,
										lastName: true,
									},
								},
								storeReply: {
									select: {
										storeName: true,
									},
								},
							},
							orderBy: {
								updatedAt: 'desc',
							},
						},
					},
					orderBy: {
						updatedAt: 'desc',
					},
				},
				promotionProduct: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const products = storeProducts.map((product) => {
			return {
				...product,
				discount: product.promotionProduct
					? setDiscount(product.discount, product.promotionProduct)
					: product.discount,
				variations: groupVariations(product.variations ?? []),
				rating: getTotalRating(product.reviews ?? []),
			};
		});

		const pages = Math.ceil(
			(totalCount < 1 ? 1 : totalCount) /
				(query.take > storeProducts.length ? query.take : storeProducts.length)
		);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PRODUCT_FOUND.CODE,
			message: STORE_MSG.PRODUCT_FOUND.MESSAGE,
			type: 'success',
			data: {
				query: {
					page: query.skip,
					pages,
					records: storeProducts.length,
				},
				products,
			},
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
