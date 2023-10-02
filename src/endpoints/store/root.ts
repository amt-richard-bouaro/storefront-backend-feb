import express from 'express';

import { getStores } from './controller/allStores';

import { isAuthenticated } from '../../middlewares/authenticate';
import { getStore } from './controller/getStore';
import { addSiteImage } from './controller/addSiteImage';
import { imageUpload } from '../../middlewares/uploader';

const app = express.Router();

app.get('/all', isAuthenticated, getStores);
app.get('/:store_id', isAuthenticated, getStore);
app.post(
	'/template/images/:store_id',
	isAuthenticated,
	imageUpload.single('images'),
	addSiteImage
);

export default app;
