import { Database } from "../../../extensions/dbClient";

export const activateAccount = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			isActive: true,
		},
		include: {
			business: true,
			customer: true,
		},
	});

	return user;
};