import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { addShipping } from '../../controllers/customer/addShipping';
import { getCustomer } from '../../controllers/customer/getCustomer';
import { getCustomerReviews } from '../../controllers/customer/getReviews';
import { reviewProduct } from '../../controllers/customer/reviewProduct';
import { getCustomerShippings } from '../../controllers/customer/getCustomerShippings';
import { getCustomerOrders } from '../../controllers/customer/getCustomerOrders';
import { CUSTOMER } from '../../constants/api/endpoints';
import { customerReply } from '../../controllers/customer/customerReply';
import { getFavoriteProducts } from '../../controllers/customer/getFavoriteProducts';
import { addToViews } from '../../controllers/customer/addToviews';
import { setLikedProduct } from '../../controllers/customer/setFavoriteProduct';
import { getWallets } from '../../controllers/payment/getWallets';
import { addCustomerWallet } from '../../controllers/customer/addCustomerWallet';
import { unsetLikedProduct } from '../../controllers/customer/unsetFavProduct';

const customer = express.Router();

customer.post(CUSTOMER.ADD_SHIPPING_ADDRESS, isAuthenticated, addShipping);
customer.get(CUSTOMER.GET_CUSTOMER, isAuthenticated, getCustomer);
customer.get(CUSTOMER.GET_ORDERS, isAuthenticated, getCustomerOrders);
customer.get(
	CUSTOMER.GET_SHIPPING_ADDRESSES,
	isAuthenticated,
	getCustomerShippings
);
customer.get(CUSTOMER.GET_REVIEWS, isAuthenticated, getCustomerReviews);
customer.post(CUSTOMER.REVIEW_PRODUCT, isAuthenticated, reviewProduct);
customer.post(CUSTOMER.REPLY_REVIEW, isAuthenticated, customerReply);
customer.post(CUSTOMER.ADD_WALLET, isAuthenticated, addCustomerWallet);
customer.get(CUSTOMER.GET_WALLETS, isAuthenticated, getWallets);
customer.post(CUSTOMER.ADD_VIEW_PRODUCTS, isAuthenticated, addToViews);
customer.post(CUSTOMER.ADD_FAVORITE_PRODUCTS, isAuthenticated, setLikedProduct);
customer.patch(
	CUSTOMER.UNSET_FAVORITE_PRODUCT,
	isAuthenticated,
	unsetLikedProduct
);
customer.get(
	CUSTOMER.GET_FAVORITE_PRODUCTS,
	isAuthenticated,
	getFavoriteProducts
);

export default customer;
