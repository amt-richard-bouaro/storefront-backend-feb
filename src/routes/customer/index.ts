import express from 'express';
import {
	isAuthenticated,
	restrictedTo,
} from '../../middlewares/authentication/authenticate';
import { addShipping } from '../../controllers/customer/addShipping';
import { getCustomer } from '../../controllers/customer/getCustomer';
import { getCustomerReviews } from '../../controllers/customer/getReviews';
import { reviewProduct } from '../../controllers/customer/reviewProduct';
import { getCustomerShippings } from '../../controllers/customer/getCustomerShippings';
import { getCustomerOrders } from '../../controllers/customer/getCustomerOrders';
import { CUSTOMER } from '../../constants/api/endpoints';
import { customerReply } from '../../controllers/customer/customerReply';
import { getFavoriteProducts } from '../../controllers/customer/getSavedProducts';
import { addToViews } from '../../controllers/customer/addToviews';
import { setLikedProduct } from '../../controllers/customer/setFavoriteProduct';
import { getWallets } from '../../controllers/payment/getWallets';
import { addCustomerWallet } from '../../controllers/customer/addCustomerWallet';
import { unsetLikedProduct } from '../../controllers/customer/unsetFavProduct';

const customer = express.Router();

customer.post(
	CUSTOMER.ADD_SHIPPING_ADDRESS,
	isAuthenticated,
	restrictedTo(['Customer']),
	addShipping
);
customer.get(
	CUSTOMER.GET_CUSTOMER,
	isAuthenticated,
	restrictedTo(['Customer']),
	getCustomer
);
customer.get(
	CUSTOMER.GET_ORDERS,
	isAuthenticated,
	restrictedTo(['Customer']),
	getCustomerOrders
);
customer.get(
	CUSTOMER.GET_SHIPPING_ADDRESSES,
	isAuthenticated,
	getCustomerShippings
);
customer.get(
	CUSTOMER.GET_REVIEWS,
	isAuthenticated,
	restrictedTo(['Customer']),
	getCustomerReviews
);
customer.post(
	CUSTOMER.REVIEW_PRODUCT,
	isAuthenticated,
	restrictedTo(['Customer']),
	reviewProduct
);
customer.post(
	CUSTOMER.REPLY_REVIEW,
	isAuthenticated,
	restrictedTo(['Customer']),
	customerReply
);
customer.post(
	CUSTOMER.ADD_WALLET,
	isAuthenticated,
	restrictedTo(['Customer']),
	addCustomerWallet
);
customer.get(
	CUSTOMER.GET_WALLETS,
	isAuthenticated,
	restrictedTo(['Customer']),
	getWallets
);
customer.post(
	CUSTOMER.ADD_VIEW_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Customer']),
	addToViews
);
customer.post(
	CUSTOMER.ADD_FAVORITE_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Customer']),
	setLikedProduct
);
customer.patch(
	CUSTOMER.UNSET_FAVORITE_PRODUCT,
	isAuthenticated,
	restrictedTo(['Customer']),
	unsetLikedProduct
);
customer.get(
	CUSTOMER.GET_SAVED_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Customer']),
	getFavoriteProducts
);

export default customer;
