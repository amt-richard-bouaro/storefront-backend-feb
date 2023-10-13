import express from 'express';
import {
	isAuthenticated,
	restrictedTo,
} from '../../middlewares/authentication/authenticate';
import { initializeOrder } from '../../controllers/order/initialize';
import { approveOrder } from '../../controllers/order/approve';
import { updateItemQuantity } from '../../controllers/order/updateItemQuantity';
import { removeOrderItem } from '../../controllers/order/removeOrderItem';
import { cancelOrder } from '../../controllers/order/cancelOrders';
import { getOrder } from '../../controllers/order/getOrder';
import { changeOrderShipping } from '../../controllers/order/changeOrderShipping';
import { ORDER } from '../../constants/api/endpoints';
import { orderDelivered } from '../../controllers/order/orderDelivered';
import { sendInvoice } from '../../controllers/payment/invoice';
import { orderShipped } from '../../controllers/order/orderShipped';

const order = express.Router();

order.post(ORDER.INITIALIZE_ORDER, initializeOrder);
order.post(ORDER.APPROVE_ORDER_PAYMENT, approveOrder);
order.patch(
	ORDER.SET_ORDER_AS_DELIVERED,
	isAuthenticated,
	restrictedTo(['Business']),
	orderDelivered
);
order.patch(
	ORDER.SET_ORDER_AS_SHIIPED,
	isAuthenticated,
	restrictedTo(['Business']),
	orderShipped
);
order.patch(
	ORDER.UPDATE_ORDER_ITEM,
	isAuthenticated,
	restrictedTo(['Customer']),
	updateItemQuantity
);
order.delete(
	ORDER.REMOVE_ORDER_ITEMS,
	isAuthenticated,
	restrictedTo(['Customer']),
	removeOrderItem
);
order.get(
	ORDER.GET_ORDER,
	isAuthenticated,
	restrictedTo(['Business', 'Customer']),
	getOrder
);
order.patch(
	ORDER.CANCEL_ORDERS,
	restrictedTo(['Business', 'Customer']),
	isAuthenticated,
	cancelOrder
);
order.patch(
	ORDER.CHANGE_ORDER_SHIPPING,
	isAuthenticated,
	restrictedTo(['Customer']),
	changeOrderShipping
);
order.get('/invoice', sendInvoice);

export default order;
