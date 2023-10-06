import { Database } from '../../../extensions/dbClient';
import { DESTINATION } from '../../../interfaces';

export const findAvailableDestinations = async (): Promise<
	DESTINATION[] | null
> => {
	const destinations = await Database.destination.findMany({});
	return destinations;
};

export const findStoreDestinations = async (
	storeID: string
): Promise<DESTINATION[] | null> => {
	const destinations = await Database.shippingDestination.findMany({
		where: {
			store: storeID,
		},
	});
	return destinations;
};

export const createStoreDestinations = async (
	storeID: string,
	data: {
		name: string;
		code: string;
		cost: number;
		duration: number;
	}[]
): Promise<{ count: number } | null> => {
	const refinedData: {
		name: string;
		code: string;
		cost: number;
		duration: number;
		store: string;
	}[] = [];

	data.forEach((el) => {
		refinedData.push({ ...el, store: storeID });
	});

	const destinations = await Database.shippingDestination.createMany({
		data: refinedData,
	});
	return destinations;
};

export const findStoreDestination = async (
	id: string
): Promise<DESTINATION | null> => {
	const destination = await Database.shippingDestination.findFirst({
		where: {
			id,
		},
	});
	return destination;
};

export const updateStoreDestination = async (
	id: string,
	data: {
		cost: number;
		duration: number;
	}
): Promise<DESTINATION | null> => {
	const destination = await Database.shippingDestination.update({
		where: {
			id,
		},
		data,
	});
	return destination;
};
