import { PRODUCT } from '../../../interfaces/types';
import { totalAmountToPay } from './amountToPay';

export const productsAvailability = (
	products: PRODUCT[],
	items: { product: string; quantity: number; variations: { id: string }[] }[]
) => {
	const unavailbleProducts: {
		product: string;
		quantity: number;
		variations: { id: string }[];
		instock: number;
		reason: string;
	}[] = [];

	const availableProducts: {
		product: string;
		name: string;
		price: number;
		discount: number;
		quantity: number;
		variations: { id: string }[];
		total: number;
		image: string;
	}[] = [];

	const totalQuantities = new Map<string, number>();

	items.map((item) => {
		const productFound = products.find(
			(product) => product.id === item.product
		);
		if (productFound === undefined) {
			unavailbleProducts.push({
				...item,
				instock: 0,
				reason: 'Product not found',
			});
		} else if (!productFound.isActive) {
			unavailbleProducts.push({
				...item,
				instock: productFound.quantity,
				reason: 'Product is not on sale at this moment',
			});
		} else {
			const totalQuantity = totalQuantities.get(item.product) ?? 0;

			totalQuantities.set(item.product, totalQuantity + item.quantity);

			const quantities = totalQuantities.get(item.product) ?? 0;

			if (productFound.quantity < quantities) {
				unavailbleProducts.push({
					...item,
					instock: productFound.quantity,
					reason: `Stock quantity ${
						productFound.quantity
					} insufficient for order quantity ${totalQuantities.get(
						item.product
					)}`,
				});
			} else {
				const cart = {
					product: productFound.id,
					name: productFound.name,
					price: productFound.price,
					discount: productFound.discount,
					quantity: item.quantity,
					variations: item.variations,
					total: totalAmountToPay([productFound], [item]),
					image: productFound.images
						? productFound.images[0].url
						: 'https://www.google.com/images/1',
				};

				availableProducts.push(cart);
			}
		}
	});

	return { availableProducts, unavailbleProducts };
};
