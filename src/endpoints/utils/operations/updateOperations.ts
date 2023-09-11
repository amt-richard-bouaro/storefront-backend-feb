import { SERVER_CONFIG } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import bcrypt from 'bcrypt';

export const verifyAccount = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			verified: true,
		},
		select: {
			id: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			providerId: true,
			mustChangePassword: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			customer: true,
			business: true,
		},
	});

	return user;
};

export const updateResetStatus = async (email: string, token: string) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const password = await bcrypt.hash(token, salt);

	const user = await Database.account.update({
		where: {
			email,
		},
		data: {
			verificationToken: token,
			mustChangePassword: true,
			canResetPassword: false,
			password,
		},
	});

	return user;
};

export const allowResetPassword = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			isActive: false,
			canResetPassword: true,
		},
		select: {
			id: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			providerId: true,
			mustChangePassword: true,
			canResetPassword: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			customer: true,
			business: true,
		},
	});

	return user;
};

export const activateAccount = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			isActive: true,
		},
	});

	return user;
};

export const changePassword = async (data: {
	id: string;
	password: string;
}) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const hashedPassword = await bcrypt.hash(data.password, salt);

	const user = await Database.account.update({
		where: {
			id: data.id,
		},
		data: {
			password: hashedPassword,
			mustChangePassword: false,
			canResetPassword: false,
		},
	});

	return user;
};
