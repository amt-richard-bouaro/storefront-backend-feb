import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
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

const store = express.Router();

store.post(
	STORE.ADD_SITE_IMAGE,
	imageUpload.single('image'),
	isAuthenticated,
	addSiteImage
);

store.get(STORE.GET_STORE, isAuthenticated, getStore);
store.get(STORE.GET_TEMPLATE_DRAFT, isAuthenticated, getTemp);
store.get(STORE.GET_STORE_ORDERS, isAuthenticated, getStoreOrders);
store.post(STORE.ADD_STORE_CATEGORY, isAuthenticated, addCategory);
store.post(STORE.ADD_WALLET, isAuthenticated, addStoreWallet);
store.get(STORE.GET_STORE_WALLETS, isAuthenticated, getWallets);
store.delete(STORE.DELETE_STORE_CATEGORY, isAuthenticated, deleteCategory);
store.patch(STORE.SAVE_TEMPLATE_DRAFT, isAuthenticated, saveTemplate);
store.patch(STORE.PUBLISH_TEMPLATE, isAuthenticated, publishTemplate);
store.post(STORE.ADD_SHIPPING_DESTINATION, saveDestination);
store.patch(STORE.UPDATE_SHIPPING_DESTINATION, updateDestination);
store.patch(STORE.REMOVE_PROMOTION_ITEM, removePromoItem);
store.patch(STORE.UPDATE_SHIPPING_DESTINATION, deletePromotion);

export default store;
