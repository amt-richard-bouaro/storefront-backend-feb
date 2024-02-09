import express from 'express';
import {
	isAuthenticated,
	restrictedTo,
} from '../../middlewares/authentication/authenticate';
import { incomingFile } from '../../middlewares/uploader';
import { addProduct } from '../../controllers/product/addProduct';
import { deleteProduct } from '../../controllers/product/deleteProducts';
import { deleteProductImages } from '../../controllers/product/deleteProductImages';
import { updateProduct } from '../../controllers/product/updateProduct';
import { getReviews } from '../../controllers/product/getProductReviews';
import { getProducts } from '../../controllers/product/getProducts';
import { getSingleProduct } from '../../controllers/product/getSingleProduct';
import { PRODUCT } from '../../constants/api/endpoints';
import { updateDiscounts } from '../../controllers/product/updateDiscounts';
import { addProductsToPromo } from '../../controllers/product/addToPromotion';

const product = express.Router();

product.post(
	PRODUCT.ADD_PRODUCT,
	isAuthenticated,
	incomingFile.array('images', 4),
	restrictedTo(['Business']),
	addProduct
);
product.post(
	PRODUCT.DELETE_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Business']),
	deleteProduct
);
product.post(
	PRODUCT.DELETE_PRODUCT_IMAGES,
	isAuthenticated,
	restrictedTo(['Business']),
	deleteProductImages
);
product.patch(
	PRODUCT.UPDATE_PRODUCT,
	isAuthenticated,
	restrictedTo(['Business']),
	updateProduct
);
product.patch(
	PRODUCT.UPDATE_PRODUCTS_DISCOUNT,
	isAuthenticated,
	restrictedTo(['Business']),
	updateDiscounts
);
product.patch(
	PRODUCT.ADD_PRODUCTS_PROMOTION,
	isAuthenticated,
	restrictedTo(['Business']),
	addProductsToPromo
);
product.get(
	PRODUCT.GET_PRODUCT_REVIEWS,
	isAuthenticated,
	restrictedTo(['Business']),
	getReviews
);
product.get(
	PRODUCT.GET_STORE_PRODUCTS,
	isAuthenticated,
	restrictedTo(['Business']),
	getProducts
);
product.get(
	PRODUCT.GET_PRODUCT,
	isAuthenticated,
	restrictedTo(['Business', 'Customer']),
	getSingleProduct
);

export default product;
