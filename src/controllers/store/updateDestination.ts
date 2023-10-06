import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { UPDATE_DESTINATION } from '../../validations/store';
import {
	findStoreDestination,
	updateStoreDestination,
} from '../../services/app/defaults/destinations';
import { DEFAULTS_MSG } from '../../constants/api/messages/defaults';

export const updateDestination = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const destinationID = req.params.destination_id;

		UPDATE_DESTINATION.parse(req.body);

		const newDestinationInf = <UPDATE_DESTINATION>req.body;

		const destinationExist = await findStoreDestination(destinationID);

		if (!destinationExist) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: DEFAULTS_MSG.SHIPPING_DESTINATION_NOT_FOUND.CODE,
				message: DEFAULTS_MSG.SHIPPING_DESTINATION_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatedDestinations = await updateStoreDestination(
			destinationExist.id,
			newDestinationInf
		);

		if (!updatedDestinations) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: DEFAULTS_MSG.SHIPPING_DESTINATION_UPDATE_FAILED.CODE,
				message: DEFAULTS_MSG.SHIPPING_DESTINATION_UPDATE_FAILED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: DEFAULTS_MSG.SHIPPING_DESTINATION_UPDATED_SUCCESSFULLY.CODE,
			message: DEFAULTS_MSG.SHIPPING_DESTINATION_UPDATED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: updatedDestinations,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
