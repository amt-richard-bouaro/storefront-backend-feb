import { PrismaClient } from '@prisma/client';
import { SERVER_CONFIG } from '../../config';

export const Database = new PrismaClient({
	errorFormat: 'pretty',
	log: [
		{
			emit: 'stdout',
			level: SERVER_CONFIG.NODE_ENV === 'production' ? 'error' : 'info',
		},
	],
});
