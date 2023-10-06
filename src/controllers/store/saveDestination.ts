import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { NEW_DESTINATION } from '../../validations/store';
import {
	createStoreDestinations,
	findStoreDestinations,
} from '../../services/app/defaults/destinations';
import { DEFAULTS_MSG } from '../../constants/api/messages/defaults';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE_MSG } from '../../constants/api/messages';

export const saveDestination = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		NEW_DESTINATION.parse(req.body);

		const { destinations } = <NEW_DESTINATION>req.body;

		const store = await findStoreById(storeID, {});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const storeDestinations = await findStoreDestinations(storeID);

		const nonexistingDestinations =
			storeDestinations &&
			destinations.filter((destination) => {
				const notTobecreated = storeDestinations.find(
					(des) => des.code === destination.code
				);
				return !notTobecreated ?? destination;
			});

		if (!nonexistingDestinations || nonexistingDestinations?.length < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_FAILED.CODE,
				message: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const savedDestinations = await createStoreDestinations(
			storeID,
			nonexistingDestinations
		);

		if (!savedDestinations || savedDestinations.count < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_FAILED.CODE,
				message: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const newDestinations = await findStoreDestinations(storeID);

		return res.status(STATUS.OK).json({
			code: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_SUCCESSFUL.CODE,
			message: DEFAULTS_MSG.ADD_SHIPPING_DESTINATION_SUCCESSFUL.MESSAGE,
			type: 'success',
			data: newDestinations,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
