import express from 'express';

import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { imageUpload } from '../../middlewares/uploader';
import { addProduct } from '../../controllers/product/addProduct';
import { deleteProduct } from '../../controllers/product/deleteProducts';
import { deleteProductImages } from '../../controllers/product/deleteProductImages';
import { updateProduct } from '../../controllers/product/updateProduct';
import { getReviews } from '../../controllers/product/getProductReviews';
import { getProducts } from '../../controllers/product/getProducts';
import { getSingleProduct } from '../../controllers/product/getSingleProduct';
import { PRODUCT } from '../../constants/api/endpoints';
import { updateDiscounts } from '../../controllers/product/updateDiscounts';

const product = express.Router();

product.post(
	PRODUCT.ADD_PRODUCT,
	isAuthenticated,
	imageUpload.array('images', 4),
	addProduct
);
product.post(PRODUCT.DELETE_PRODUCTS, isAuthenticated, deleteProduct);
product.post(
	PRODUCT.DELETE_PRODUCT_IMAGES,
	isAuthenticated,
	deleteProductImages
);
product.patch(PRODUCT.UPDATE_PRODUCT, isAuthenticated, updateProduct);
product.patch(
	PRODUCT.UPDATE_PRODUCTS_DISCOUNT,
	isAuthenticated,
	updateDiscounts
);
product.get(PRODUCT.GET_PRODUCT_REVIEWS, isAuthenticated, getReviews);
product.get(PRODUCT.GET_STORE_PRODUCTS, isAuthenticated, getProducts);
product.get(PRODUCT.GET_PRODUCT, isAuthenticated, getSingleProduct);

export default product;
