import { errorReceiver } from './../../middlewares/errorhandlers/errorReciever';
import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { setBusinessType } from '../../controllers/business/setBusinessType';
import { newStore } from '../../controllers/business/newStore';
import { addCategory } from '../../controllers/business/addcategory';
import { getBusiness } from '../../controllers/business/getBusinnes';
import { getBusinessStores } from '../../controllers/business/businessStore';
import { deleteCategory } from '../../controllers/business/deleteCategory';

const business = express.Router();

business.patch('/set/type/:businessID', isAuthenticated, setBusinessType);
business.post('/store/new/:businessID', isAuthenticated, newStore);
business.post('/store/category/add/:storeID', isAuthenticated, addCategory);
business.delete(
	'/store/category/delete/:categoryID',
	isAuthenticated,
	deleteCategory
);
business.get('/stores/:id', isAuthenticated, getBusinessStores);
business.get('/:id', isAuthenticated, errorReceiver(getBusiness));


export default business;
