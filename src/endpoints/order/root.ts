import express from 'express';

import { isAuthenticated } from '../../middlewares/authenticate';
import { initializeOrder } from './controller/initialize';
import { approveOrder } from './controller/approve';
import { updateItemQuantity } from './controller/updateItemQuantity';

const app = express.Router();

app.post('/initialize/:customerID', isAuthenticated, initializeOrder);
app.post('/approve/:orderID', approveOrder);
app.patch('/item/:orderID', updateItemQuantity);

export default app;
