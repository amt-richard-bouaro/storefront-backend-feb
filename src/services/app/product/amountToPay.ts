import { PRODUCT } from '../../../interfaces/types';

export const totalAmountToPay = (
	products: PRODUCT[],
	items: { product: string; quantity: number }[]
): number => {
	const itemIDs: string[] = items.map((item) => item.product);

	const orderedItems = products.filter((product) =>
		itemIDs.includes(product.id)
	);

	let total: number = 0;

	orderedItems.map((product) => {
		const item = items.find((item) => item.product === product.id);

		if (item !== undefined) {
			const discount =
				product.discount > 0
					? (product.discount / 100) * product.price * item.quantity
					: 0;

			const amount = item.quantity * product.price - discount;

			total = total + amount;
		}
	});

	return Number(total.toFixed(2));
};
