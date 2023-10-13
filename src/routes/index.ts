import { Express } from 'express';
import accountEndpoints from './account';
import businessEndpoints from './business';
import productEndpoints from './product';
import orderEndpoints from './order';
import storeEndpoints from './store';
import customerEndpoints from './customer';
import defaultEndpoints from './defaults';
import {
	ACCOUNT,
	BUSINESS,
	CUSTOMER,
	ORDER,
	PRODUCT,
	STORE,
} from '../constants/api/endpoints';
import { DEFAULTS } from '../constants/api/endpoints/defaults';

function routes(app: Express) {
	app.get('/', (req, res) => {
		return res.redirect('/api/v1/docs');
	});

	app.use(ACCOUNT.BASE_ROUTE, accountEndpoints);

	app.use(BUSINESS.BASE_ROUTE, businessEndpoints);

	app.use(STORE.BASE_ROUTE, storeEndpoints);

	app.use(PRODUCT.BASE_ROUTE, productEndpoints);

	app.use(ORDER.BASE_ROUTE, orderEndpoints);

	app.use(CUSTOMER.BASE_ROUTE, customerEndpoints);

	app.use(DEFAULTS.BASE_ROUTE, defaultEndpoints);
}

export default routes;
