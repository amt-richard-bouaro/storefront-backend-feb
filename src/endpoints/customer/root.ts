import express from 'express';

import { isAuthenticated } from '../../middlewares/authenticate';

import { addShipping } from './controller/addShipping';
import { getCustomer } from './controller/getCustomer';

const app = express.Router();

app.post('/shipping/add', isAuthenticated, addShipping);
app.get('/:customerID', isAuthenticated, getCustomer);

export default app;
