import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { initializeOrder } from '../../controllers/order/initialize';
import { approveOrder } from '../../controllers/order/approve';
import { updateItemQuantity } from '../../controllers/order/updateItemQuantity';
import { removeOrderItem } from '../../controllers/order/removeOrderItem';
import { cancelOrder } from '../../controllers/order/cancelOrders';
import { getStoreOrder } from '../../controllers/order/getStoreOrders';
import { getOrder } from '../../controllers/order/getOrder';

const order = express.Router();

order.post('/initialize/:customer_id', initializeOrder);
order.post('/approve/:orderID', approveOrder);
order.patch('/item/:order_id', isAuthenticated, updateItemQuantity);
order.delete('/item/:order_id', isAuthenticated, removeOrderItem);
order.get('/:order_id', isAuthenticated, getOrder);
order.get('/:storeID', isAuthenticated, getStoreOrder);
order.patch('/cancel', isAuthenticated, cancelOrder);
order.patch('change/shipping/:order_id', isAuthenticated, cancelOrder);

export default order;
