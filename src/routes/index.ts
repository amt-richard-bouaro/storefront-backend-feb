import { Express } from 'express';
import accountEndpoints from './account';
import businessEndpoints from './business';
import productEndpoints from './product';
import orderEndpoints from './order';
import storeEndpoints from './store';
import customerEndpoints from './customer';
import {
	ACCOUNT,
	BUSINESS,
	CUSTOMER,
	ORDER,
	PRODUCT,
	STORE,
} from '../constants/api/endpoints';

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
}

export default routes;
