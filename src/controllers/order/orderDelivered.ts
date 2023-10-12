import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findOrderById } from '../../services/app/order/findOrder';
import { ORDER_MSG } from '../../constants/api/messages';
import { payoutStore } from '../../services/Paypal/payPalApi';
import { findStoreById } from '../../services/app/store/findStore';
import { setOrderStatus } from '../../services/app/order/setOrderStatus';
import { savePayout } from '../../services/app/order/payouts';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import logger from '../../middlewares/logger';
import ejs from 'ejs';
import path from 'path';

export const orderDelivered = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.order_id;

		const order = await findOrderById(orderID);

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE,
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
				code: ORDER_MSG.PAYOUT_INVALID_ACCOUNT.CODE,
				message: ORDER_MSG.PAYOUT_INVALID_ACCOUNT.MESSAGE,
				type: 'error',
			});
		}

		const updatedOrder = await findOrderById(orderID, {
			items: true,
			customerOrder: true,
			storeOrder: true,
			orderShipping: true,
		});

		const invoice = updatedOrder
			? {
					customer: updatedOrder.customerOrder,
					items: updatedOrder.items,
					total: updatedOrder.amount,
					status: updatedOrder.status,
					shipping: updatedOrder.orderShipping,
					paid: updatedOrder.paid,
					curreny: updatedOrder.currency,
					orderID: updatedOrder.orderId,
			  }
			: null;

		if (invoice && invoice.customer?.customerAccount?.email) {
			const invoiceData = await ejs.renderFile(
				path.resolve('src/views/templates/invoice.ejs'),
				{
					data: invoice,
				}
			);

			await sendMail(
				mailOptions({
					to: invoice.customer.customerAccount.email,
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

		const payout =
			changeOrderStatus &&
			(await payoutStore({
				amount: (order.amount - (order.amount * 15) / 100).toFixed(2),
				currency: order.currency,
				receiver: paypalWallet.walletId,
				reference: order.referenceId,
				orderId: order.orderId,
			}));

		if (payout.status !== 204) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.PAYOUT_FAILED.CODE,
				message: ORDER_MSG.PAYOUT_FAILED.MESSAGE,
				type: 'error',
			});
		}

		await savePayout({
			commission: (order.amount * 15) / 100,
			payoutId: order.referenceId,
			amount: order.amount - (order.amount * 15) / 100,
			currency: order.currency,
			wallet: paypalWallet.walletId,
			order: order.orderId,
			store: order.store,
		});

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
