import express from 'express';
import { getAllCurrencies } from '../../controllers/defaults/getAllCurrencies';
import { DEFAULTS } from '../../constants/api/endpoints/defaults';
import { getAllDestinations } from '../../controllers/defaults/getAllDestinations';

const defaultRoutes = express.Router();

defaultRoutes.get(DEFAULTS.GET_CURRENCIES, getAllCurrencies);
defaultRoutes.get(DEFAULTS.GET_DESTINATIONS, getAllDestinations);

export default defaultRoutes;
