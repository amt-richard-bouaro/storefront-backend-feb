import { PrismaClient } from '@prisma/client';

test('should connect to the database', async () => {
	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
	});

	await prisma.$connect();

	await prisma.$disconnect();
});
