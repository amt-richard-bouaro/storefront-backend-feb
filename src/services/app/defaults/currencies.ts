import { Database } from '../../../extensions/dbClient';
import { CURRENCY } from '../../../interfaces';

export const findAvailableCurrencies = async (): Promise<CURRENCY[] | null> => {
	const currencies = await Database.currency.findMany({});
	return currencies;
};
