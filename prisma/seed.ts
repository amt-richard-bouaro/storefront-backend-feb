import { hashPassword } from './../src/helpers';
import { PrismaClient } from '@prisma/client';
import { currencies } from './currencies';
import { destination } from './destination';
import { account } from './accounts';

export const db = new PrismaClient();

async function seed() {
	const seeded = db.$transaction(async (tx) => {
		await tx.currency.deleteMany({});
		await tx.destination.deleteMany({});
		await tx.account.deleteMany({
			where: {
				email: {
					in: ['test@business.com', 'test@customer.com', 'test@system.com'],
				},
			},
		});

		const seededBusiness = await tx.business.create({
			data: {
				businessName: account.business.businessName,
				businessAccount: {
					create: {
						email: account.business.email,
						password: await hashPassword(account.business.password),
						isActive: account.business.isActive,
						mustChangePassword: account.business.mustChangePassword,
						verified: account.business.verified,
						verificationToken: account.business.verificationToken,
						canResetPassword: account.business.canResetPassword,
						provider: 'local',
						type: 'Business',
					},
				},
			},
		});

		const seededCustomer = await tx.customer.create({
			data: {
				firstName: account.customer.firstName,
				lastName: account.customer.lastName,
				customerAccount: {
					create: {
						email: account.customer.email,
						password: await hashPassword(account.customer.password),
						isActive: account.customer.isActive,
						mustChangePassword: account.customer.mustChangePassword,
						verified: account.customer.verified,
						verificationToken: account.customer.verificationToken,
						canResetPassword: account.customer.canResetPassword,
						provider: 'local',
						type: 'Customer',
					},
				},
			},
		});

		const seededAdmin = await tx.account.create({
			data: {
				email: account.admin.email,
				password: await hashPassword(account.admin.password),
				isActive: account.admin.isActive,
				mustChangePassword: account.admin.mustChangePassword,
				verified: account.admin.verified,
				verificationToken: account.admin.verificationToken,
				canResetPassword: account.admin.canResetPassword,
				provider: 'local',
				type: 'Admin',
			},
		});

		const seededCurrencies = await tx.currency.createMany({
			data: currencies,
		});

		const seededDestination = await tx.destination.createMany({
			data: destination,
		});

		return {
			seededCurrencies,
			seededDestination,
			seededAdmin,
			seededCustomer,
			seededBusiness,
		};
	});
	return seeded;
}

seed()
	.then(async (seeded) => {
		console.log(seeded);

		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
