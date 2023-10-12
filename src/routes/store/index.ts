import express from 'express';
import {
	isAuthenticated,
	restrictedTo,
} from '../../middlewares/authentication/authenticate';
import { addSiteImage } from '../../controllers/store/addSiteImage';
import { getStore } from '../../controllers/store/getStore';
import { imageUpload } from '../../middlewares/uploader';
import { saveTemplate } from '../../controllers/store/saveTemplateChanges';
import { publishTemplate } from '../../controllers/store/publishTemplateChanges';
import { getTemp } from '../../controllers/store/getStoreTemp';
import { deleteCategory } from '../../controllers/store/deleteCategory';
import { addCategory } from '../../controllers/store/addcategory';
import { STORE } from '../../constants/api/endpoints';
import { saveDestination } from '../../controllers/store/saveDestination';
import { updateDestination } from '../../controllers/store/updateDestination';
import { getStoreOrders } from '../../controllers/store/getStoreOrders';
import { addStoreWallet } from '../../controllers/store/addStoreWallet';
import { getWallets } from '../../controllers/payment/getWallets';
import { removePromoItem } from '../../controllers/store/removePromoItem';
import { deletePromotion } from '../../controllers/store/deletePromotion';
import { addPromotion } from '../../controllers/store/addPromotion';
import { getPromoProducts } from '../../controllers/store/getPromoProducts';
import { getStorePromotions } from '../../controllers/store/getStorePromotions';
import { updatedPromotion } from '../../controllers/store/updatePromotion';
import { getAllStores } from '../../controllers/store/allStores';
import { getStoreReviews } from '../../controllers/store/getStoreReviews';
import { replyCustomerReview } from '../../controllers/store/replyCustomerReview';

const store = express.Router();

store.post(
	STORE.ADD_SITE_IMAGE,
	imageUpload.single('image'),
	isAuthenticated,
	addSiteImage
);

store.get(
	STORE.GET_STORE,
	isAuthenticated,
	restrictedTo(['Customer']),
	getStore
);
store.get(
	STORE.GET_STORES,
	isAuthenticated,
	restrictedTo(['Business', 'Customer']),
	getAllStores
);
store.get(
	STORE.GET_TEMPLATE_DRAFT,
	isAuthenticated,
	restrictedTo(['Business']),
	getTemp
);
store.get(
	STORE.GET_STORE_ORDERS,
	isAuthenticated,
	restrictedTo(['Business']),
	getStoreOrders
);
store.get(
	STORE.GET_PROMOTION_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Business']),
	getPromoProducts
);
store.get(
	STORE.GET_PROMOTIONS,
	isAuthenticated,
	restrictedTo(['Business']),
	getStorePromotions
);
store.get(
	STORE.GET_STORE_REVIEWS,
	isAuthenticated,
	restrictedTo(['Business']),
	getStoreReviews
);
store.post(
	STORE.REPLY_REVIEW,
	isAuthenticated,
	restrictedTo(['Business']),
	replyCustomerReview
);
store.post(
	STORE.ADD_PROMOTION,
	isAuthenticated,
	restrictedTo(['Business']),
	addPromotion
);
store.patch(
	STORE.UPDATE_PROMOTION,
	isAuthenticated,
	restrictedTo(['Business']),
	updatedPromotion
);
store.post(
	STORE.ADD_STORE_CATEGORY,
	isAuthenticated,
	restrictedTo(['Business']),
	addCategory
);
store.post(
	STORE.ADD_WALLET,
	isAuthenticated,
	restrictedTo(['Business']),
	addStoreWallet
);
store.get(
	STORE.GET_STORE_WALLETS,
	isAuthenticated,
	restrictedTo(['Business']),
	getWallets
);
store.delete(
	STORE.DELETE_STORE_CATEGORY,
	isAuthenticated,
	restrictedTo(['Business']),
	deleteCategory
);
store.patch(
	STORE.SAVE_TEMPLATE_DRAFT,
	isAuthenticated,
	restrictedTo(['Business']),
	saveTemplate
);
store.patch(
	STORE.PUBLISH_TEMPLATE,
	isAuthenticated,
	restrictedTo(['Business']),
	publishTemplate
);
store.post(
	STORE.ADD_SHIPPING_DESTINATION,
	restrictedTo(['Business']),
	saveDestination
);
store.patch(
	STORE.UPDATE_SHIPPING_DESTINATION,
	restrictedTo(['Business']),
	updateDestination
);
store.patch(
	STORE.REMOVE_PROMOTION_ITEM,
	restrictedTo(['Business']),
	removePromoItem
);
store.patch(
	STORE.UPDATE_SHIPPING_DESTINATION,
	restrictedTo(['Business']),
	deletePromotion
);
store.patch(
	STORE.ADD_SITE_IMAGE,
	isAuthenticated,
	imageUpload.single('image'),
	restrictedTo(['Business']),
	addSiteImage
);

export default store;
