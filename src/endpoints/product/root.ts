import express from 'express';

import { isAuthenticated } from '../../middlewares/authenticate';
import { addProduct } from './controller/addProduct';
import { imageUpload } from '../../middlewares/uploader';
import { deleteProduct } from './controller/deleteProducts';
import { deleteProductImages } from './controller/deleteProductImages';
import { updateProduct } from './controller/updateProduct';
import { reviewProduct } from './controller/reviewProduct';
import { getReviews } from './controller/reviews';
import { getProducts } from './controller/getProducts';

const app = express.Router();

app.post(
	'/add/:storeID',
	isAuthenticated,
	imageUpload.array('images', 4),
	addProduct
);
app.post('/delete', isAuthenticated, deleteProduct);
app.post('/images/delete', isAuthenticated, deleteProductImages);
app.patch('/update/:productID', isAuthenticated, updateProduct);
app.post('/review/:order_id', isAuthenticated, reviewProduct);
app.get('/reviews/:product_id', isAuthenticated, getReviews);
app.get('/all/:store_id', isAuthenticated, getProducts);

export default app;
