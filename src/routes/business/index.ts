import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { setBusinessType } from '../../controllers/business/setBusinessType';
import { newStore } from '../../controllers/business/newStore';
import { getBusiness } from '../../controllers/business/getBusinnes';
import { getBusinessStores } from '../../controllers/business/businessStore';
import { BUSINESS } from '../../constants/api/endpoints';

const business = express.Router();

business.patch(BUSINESS.SET_BUSINESS_TYPE, isAuthenticated, setBusinessType);
business.post(BUSINESS.NEW_BUSINESS_STORE, isAuthenticated, newStore);
business.get(BUSINESS.GET_BUSINESS_STORES, isAuthenticated, getBusinessStores);
business.get(BUSINESS.GET_BUSINESS, isAuthenticated, getBusiness);

export default business;
