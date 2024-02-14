import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import {
	findOrderById,
	findOrderPayoutById,
} from '../../services/app/order/findOrder';
import { ORDER_MSG } from '../../constants/api/messages';
import { getCapturedOrder, payoutStore } from '../../services/Paypal/payPalApi';
import { findStoreById } from '../../services/app/store/findStore';
import { setOrderStatus } from '../../services/app/order/setOrderStatus';
import { savePayout } from '../../services/app/order/payouts';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import logger from '../../middlewares/logger';
// import ejs from 'ejs';
// import path from 'path';
import { emailInvoices } from '../../views/emailTemplates';

export const orderDelivered = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.order_id;

		const order = await findOrderById(orderID, {}, ['Processing', 'Shipped']);

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message:
					ORDER_MSG.NOT_FOUND.MESSAGE +
					' Or the order is in processing or shipped',
				type: 'error',
			});
		}

		const orderHasPayout = await findOrderPayoutById(order.id);

		if (orderHasPayout) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: 'Order has payout already',
				type: 'error',
			});
		}

		const storeWithWallets = await findStoreById(order.store, {
			wallets: true,
		});

		const paypalWallet =
			storeWithWallets &&
			storeWithWallets.wallets?.find((wallet) => wallet.method === 'Paypal');

		if (!paypalWallet) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.PAYOUT_INVALID_ACCOUNT.CODE,
				message: ORDER_MSG.PAYOUT_INVALID_ACCOUNT.MESSAGE,
				type: 'error',
			});
		}

		const changeOrderStatus = await setOrderStatus(order.id, 'Delivered');

		if (!changeOrderStatus) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FULFILLED.CODE,
				message: ORDER_MSG.NOT_FULFILLED.MESSAGE,
				type: 'error',
			});
		}

		const updatedOrder = await findOrderById(orderID, {
			items: true,
			customerOrder: true,
			storeOrder: true,
			orderShipping: true,
		});

		const payout =
			changeOrderStatus &&
			(await payoutStore({
				amount: (order.amount - (order.amount * 15) / 100).toFixed(2),
				currency: order.currency,
				receiver: paypalWallet.walletId,
				reference: order.referenceId,
				orderId: order.orderId,
			}));

		if (payout.status !== 201) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.PAYOUT_FAILED.CODE,
				message: ORDER_MSG.PAYOUT_FAILED.MESSAGE,
				type: 'error',
			});
		}

		await savePayout({
			commission: 15,
			payoutId: order.referenceId,
			amount: order.amount - (order.amount * 15) / 100,
			currency: order.currency,
			wallet: paypalWallet.walletId,
			order: order.id,
			store: order.store,
		});

		const paymentInfo = await getCapturedOrder(order.orderId);

		const payer =
			paymentInfo.status === 200
				? {
						email: paymentInfo.json.payer.email_address as string,
						givenName: paymentInfo.json.payer.name.given_name as string,
						surname: paymentInfo.json.payer.name.surname as string,
				  }
				: null;

		const invoice = updatedOrder
			? {
					customerName: `${updatedOrder.customerOrder?.firstName} ${updatedOrder.customerOrder?.lastName}`,
					customerEmail: updatedOrder.customerOrder?.customerAccount?.email,
					items: updatedOrder.items,
					total: updatedOrder.amount,
					status: updatedOrder.status,
					shipping: updatedOrder.orderShipping,
					paid: updatedOrder.paid,
					currency: updatedOrder.currency,
					orderID: updatedOrder.orderId,
					payer,
			  }
			: null;

		if (invoice) {
			const invoiceData = emailInvoices(invoice);

			await sendMail(
				mailOptions({
					to: invoice.customerEmail!,
					subject: 'Order Notification',
					html: invoiceData,
				}),
				(err) => {
					if (err) {
						logger.error(err);
					}
				}
			);
		}

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.PAYOUT_SUCCESSFUL.CODE,
			message: ORDER_MSG.PAYOUT_SUCCESSFUL.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
