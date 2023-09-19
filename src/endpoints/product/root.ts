import express from 'express';

import { isAuthenticated } from '../../middlewares/authenticate';
import { addProduct } from './controller/addProduct';
import { imageUpload } from '../../middlewares/uploader';
import { deleteProduct } from './controller/deleteProducts';
import { deleteProductImages } from './controller/deleteProductImages';

const app = express.Router();

app.post(
	'/add/:storeID',
	isAuthenticated,
	imageUpload.array('images', 4),
	addProduct
);
app.delete('/delete', isAuthenticated, deleteProduct);
app.delete('/images/delete', isAuthenticated, deleteProductImages);

export default app;
