import { Express } from 'express';
import accountEndpoints from './account';
import businessEndpoints from './business';
import productEndpoints from './product';
import orderEndpoints from './order';
import storeEndpoints from './store';
import customerEndpoints from './customer';

function routes(app: Express) {
	app.get('/', (req, res) => {
		return res.redirect('/api/v1/docs');
	});

	app.use('/api/account', accountEndpoints);

	app.use('/api/business', businessEndpoints);

	app.use('/api/store', storeEndpoints);

	app.use('/api/product', productEndpoints);

	app.use('/api/order', orderEndpoints);

	app.use('/api/customer', customerEndpoints);
}

export default routes;
