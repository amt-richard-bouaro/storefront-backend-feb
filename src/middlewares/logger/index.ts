import { SERVER_CONFIG } from '../../config';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
	level: SERVER_CONFIG.NODE_ENV === 'production' ? 'info' : 'debug',
	format: format.json(),
	defaultMeta: { timestamp: new Date() },
	transports: [
		// new transports.File({ filename: 'logs/error.log', level: 'error' }),
		// new transports.File({ filename: 'logs/status.log' }),
		// new transports.File({ filename: 'logs/transactions.log', level: 'info' }),
	],
	// exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

if (SERVER_CONFIG.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.simple(),
		})
	);
}

export default logger;
