import express from 'express';
import { isAuthenticated } from '../../middlewares/authentication/authenticate';
import { initializeOrder } from '../../controllers/order/initialize';
import { approveOrder } from '../../controllers/order/approve';
import { updateItemQuantity } from '../../controllers/order/updateItemQuantity';
import { removeOrderItem } from '../../controllers/order/removeOrderItem';
import { cancelOrder } from '../../controllers/order/cancelOrders';
import { getStoreOrders } from '../../controllers/order/getStoreOrders';
import { getOrder } from '../../controllers/order/getOrder';
import { changeOrderShipping } from '../../controllers/order/changeOrderShipping';
import { ORDER } from '../../constants/api/endpoints';

const order = express.Router();

order.post(ORDER.INITIALIZE_ORDER, initializeOrder);
order.post(ORDER.APPROVE_ORDER_PAYMENT, approveOrder);
order.patch(ORDER.UPDATE_ORDER_ITEM, isAuthenticated, updateItemQuantity);
order.delete(ORDER.REMOVE_ORDER_ITEM, isAuthenticated, removeOrderItem);
order.get(ORDER.GET_ORDER, isAuthenticated, getOrder);
order.get(ORDER.GET_STORE_ORDERS, isAuthenticated, getStoreOrders);
order.patch(ORDER.CANCEL_ORDERS, isAuthenticated, cancelOrder);
order.patch(ORDER.CHANGE_ORDER_SHIPPING, isAuthenticated, changeOrderShipping);

export default order;
