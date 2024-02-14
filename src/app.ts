import dotenv from 'dotenv';
dotenv.config();

import { SERVER_CONFIG } from './config';
import server from './server';
// import logger from './middlewares/logger';

const app = server();

const PORT = SERVER_CONFIG.PORT;

app.listen(PORT, () => {
	console.log('listening on port ' + PORT);
});

export default app;

// export const app = appServer.listen(PORT, () => {
// 	logger.info(`app listening on port ${PORT}`);
// });

// process.on('SIGTERM', () => {
// 	logger.info('SIGTERM signal received.');
// 	logger.info('Closing http server.');
// 	app.close((err) => {
// 		logger.info('Http server closed.');
// 		process.exit(err ? 1 : 0);
// 	});
// });
