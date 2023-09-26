import express from 'express';

import { isAuthenticated } from '../../middlewares/authenticate';
// import { paystack } from './controller/paystack';
import { initializeOrder } from './controller/initialize';

const app = express.Router();

app.post('/initialize/:storeID', isAuthenticated, initializeOrder);

export default app;
