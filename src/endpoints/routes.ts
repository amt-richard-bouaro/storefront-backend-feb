import { Express } from 'express';
import accountEndpoints from './account/root';
import businessEndpoints from './business/root';
import productEndpoints from './product/root';
import orderEndpoints from './order/root';
import storeEndpoints from './store/root';

function routes(app: Express) {
	app.get('/', (req, res) => {
		return res.redirect('/api/v1/docs');
	});

	app.use('/api/account', accountEndpoints);

	app.use('/api/business', businessEndpoints);

	app.use('/api/store', storeEndpoints);

	app.use('/api/product', productEndpoints);

	app.use('/api/order', orderEndpoints);
}

export default routes;
