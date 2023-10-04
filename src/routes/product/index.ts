import express from 'express';

import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { imageUpload } from '../../middlewares/uploader';
import { addProduct } from '../../controllers/product/addProduct';
import { deleteProduct } from '../../controllers/product/deleteProducts';
import { deleteProductImages } from '../../controllers/product/deleteProductImages';
import { updateProduct } from '../../controllers/product/updateProduct';
import { getReviews } from '../../controllers/product/reviews';
import { getProducts } from '../../controllers/product/getProducts';
import { reviewProduct } from '../../controllers/product/reviewProduct';
import { getSingleProduct } from '../../controllers/product/getSingleProduct';

const product = express.Router();

product.post(
	'/add/:storeID',
	isAuthenticated,
	imageUpload.array('images', 4),
	addProduct
);
product.delete('/delete', isAuthenticated, deleteProduct);
product.delete('/images/delete', isAuthenticated, deleteProductImages);
product.patch('/update/:productID', isAuthenticated, updateProduct);
product.post('/review/:order_id', isAuthenticated, reviewProduct);
product.get('/reviews/:product_id', isAuthenticated, getReviews);
product.get('/all/:store_id', isAuthenticated, getProducts);
product.get('/:product_id', isAuthenticated, getSingleProduct);

export default product;
