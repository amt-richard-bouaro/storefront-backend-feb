import express from 'express';

import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { addShipping } from '../../controllers/customer/addShipping';
import { getCustomer } from '../../controllers/customer/getCustomer';
import { getCustomerReviews } from '../../controllers/customer/getReviews';
import { reviewProduct } from '../../controllers/customer/reviewProduct';
import { getCustomerShippings } from '../../controllers/customer/getCustomerShippings';

const customer = express.Router();

customer.post('/add-shipping/:customer_id', isAuthenticated, addShipping);
customer.get('/:customer_id', isAuthenticated, getCustomer);
customer.get('/shippings/:customer_id', isAuthenticated, getCustomerShippings);
customer.get('/reviews/:customer_id', isAuthenticated, getCustomerReviews);
customer.post('/product-review/:order_id', isAuthenticated, reviewProduct);
customer.post('/review-reply/:order_id', isAuthenticated, reviewProduct);

export default customer;
