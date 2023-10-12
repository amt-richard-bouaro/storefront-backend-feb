import express from 'express';
import {
	isAuthenticated,
	restrictedTo,
} from '../../middlewares/authentication/authenticate';
import { setBusinessType } from '../../controllers/business/setBusinessType';
import { newStore } from '../../controllers/business/newStore';
import { getBusiness } from '../../controllers/business/getBusiness';
import { getBusinessStores } from '../../controllers/business/businessStores';
import { BUSINESS } from '../../constants/api/endpoints';

const business = express.Router();

business.patch(
	BUSINESS.SET_BUSINESS_TYPE,
	isAuthenticated,
	restrictedTo(['Business']),
	setBusinessType
);
business.post(
	BUSINESS.NEW_BUSINESS_STORE,
	isAuthenticated,
	restrictedTo(['Business']),
	newStore
);
business.get(
	BUSINESS.GET_BUSINESS_STORES,
	isAuthenticated,
	restrictedTo(['Business']),
	getBusinessStores
);
business.get(
	BUSINESS.GET_BUSINESS,
	isAuthenticated,
	restrictedTo(['Business']),
	getBusiness
);

export default business;
