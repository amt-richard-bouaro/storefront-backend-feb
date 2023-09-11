import { Database } from '../../../database/dbClient';
import bcrypt from 'bcrypt';
import { NEW_ACCOUNT } from '../../account/types';
import { SERVER_CONFIG } from '../../../config/main';

import { jwtGenerator, shortCodeGenerator } from '../helperFunctions';

export const createAccount = async (data: NEW_ACCOUNT) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const hashedPassword = await bcrypt.hash(data.password, salt);

	const code = await shortCodeGenerator(6);

	const verificationToken = jwtGenerator({ email: data.email, code });

	const user =
		data.type === 'Customer'
			? await Database.customer.create({
					data: {
						firstName: data.firstName,
						lastName: data.lastName,

						customerAccount: {
							create: {
								email: data.email,
								password: hashedPassword,
								type: data.type,
								provider: data.provider,
								verified: data.verified,
								isActive: data.isActive,
								providerId:
									data.provider !== 'local' ? data.providerId : undefined,
								verificationToken: verificationToken,
							},
						},
					},
					select: {
						firstName: true,
						lastName: true,
						customerAccount: {
							select: {
								id: true,
								email: true,
								type: true,
								provider: true,
								verified: true,
								providerId: true,
								verificationToken: true,
								mustChangePassword: true,
								isActive: true,
								password: false,
								createdAt: true,
								updatedAt: true,
							},
						},
					},
			  })
			: await Database.business.create({
					data: {
						businessName: data.businessName,
						businessAccount: {
							create: {
								email: data.email,
								password: hashedPassword,
								type: data.type,
								provider: data.provider,
								verified: data.verified,
								isActive: data.isActive,
								providerId:
									data.provider !== 'local' ? data.providerId : undefined,
								verificationToken: verificationToken,
							},
						},
					},
					select: {
						businessName: true,
						businessAccount: {
							select: {
								id: true,
								email: true,
								type: true,
								provider: true,
								verified: true,
								providerId: true,
								verificationToken: true,
								mustChangePassword: true,
								isActive: true,
								password: false,
								createdAt: true,
								updatedAt: true,
							},
						},
					},
			  });

	return { user, email: data.email, code };
};
