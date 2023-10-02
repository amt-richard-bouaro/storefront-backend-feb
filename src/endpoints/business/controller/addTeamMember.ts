import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
// import { TEAM_MEMBER } from '../types';
// import { Database } from '../../../database/dbClient';
// import { STATUS } from '../../../config/main';

export const addTeamMember = async (req: Request, res: Response<RESPONSE>) => {
	try {
		// const requestBody = <TEAM_MEMBER>req.body;
		// TEAM_MEMBER.parse(requestBody);
		// const tempID = req.params.tempID;
		// let imageUrl: string;
		// let imageKey: string;
		// if (req.file) {
		// 	const file = req.file as Express.MulterS3.File;
		// 	imageUrl = file.location;
		// 	imageKey = file.key;
		// } else {
		// 	return res.status(STATUS.BAD_REQUEST).json({
		// 		code: 'TEAM_MEMBER_NOT_CREATED',
		// 		message: 'Missing picture for this team member',
		// 		type: 'error',
		// 	});
		// }
		// const team = await Database.team.create({
		// 	data: {
		// 		name: requestBody.name,
		// 		role: requestBody.role,
		// 		picture: imageUrl,
		// 		key: imageKey,
		// 		temp: tempID,
		// 	},
		// });
		// return res.status(STATUS.OK).json({
		// 	code: 'TEAM_MEMBER_ADDED',
		// 	message: 'Team member has been added successfully',
		// 	type: 'success',
		// 	data: team,
		// });
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
