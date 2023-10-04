import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { addSiteImage } from '../../controllers/store/addSiteImage';
import { getStores } from '../../controllers/store/allStores';
import { getStore } from '../../controllers/store/getStore';
import { imageUpload } from '../../middlewares/uploader';
import { getStoreOrder } from '../../controllers/store/getOrders';
import { saveTemplate } from '../../controllers/store/saveTemplateChanges';
import { publishTemplate } from '../../controllers/store/publishTemplateChanges';

const store = express.Router();

store.post(
	'/add-site-image/:store_id',
	imageUpload.single('image'),
	isAuthenticated,
	addSiteImage
);
store.get('/all', isAuthenticated, getStores);
store.get('/:store_id', isAuthenticated, getStore);
store.get('/orders/:store_id', isAuthenticated, getStoreOrder);

store.patch(
	'/save-template/:store_id',
	isAuthenticated,
	imageUpload.single('brandImage'),
	saveTemplate
);
store.put('/publish-template/:store_id', isAuthenticated, publishTemplate);

export default store;
