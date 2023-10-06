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

const store = express.Router();

store.post(
	STORE.ADD_SITE_IMAGE,
	imageUpload.single('image'),
	isAuthenticated,
	addSiteImage
);

store.get(STORE.GET_STORE, isAuthenticated, getStore);
store.get(STORE.GET_TEMPLATE_DRAFT, isAuthenticated, getTemp);
store.post(STORE.ADD_STORE_CATEGORY, isAuthenticated, addCategory);
store.delete(STORE.DELETE_STORE_CATEGORY, isAuthenticated, deleteCategory);
store.patch(STORE.SAVE_TEMPLATE_DRAFT, isAuthenticated, saveTemplate);
store.patch(STORE.PUBLISH_TEMPLATE, isAuthenticated, publishTemplate);

export default store;
