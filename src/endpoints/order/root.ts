import express from 'express';
import { isAuthenticated } from '../../middlewares/authenticate';
import { initializeOrder } from './controller/initialize';
import { approveOrder } from './controller/approve';
import { updateItemQuantity } from './controller/updateItemQuantity';
import { removeOrderItem } from './controller/removeOrderItem';
import { getOrder } from './controller/getOrder';
import { getStoreOrder } from './controller/getStoreOrders';
import { cancelOrder } from './controller/cancelOrders';

const app = express.Router();

app.post('/initialize/:customerID', initializeOrder);
app.post('/approve/:orderID', approveOrder);
app.patch('/item/:order_id', isAuthenticated, updateItemQuantity);
app.delete('/item/:order_id', isAuthenticated, removeOrderItem);
app.get('/:order_id', isAuthenticated, getOrder);
app.get('/:storeID', isAuthenticated, getStoreOrder);
app.patch('/cancel', isAuthenticated, cancelOrder);
app.patch('change/shipping/:order_id', isAuthenticated, cancelOrder);

export default app;
