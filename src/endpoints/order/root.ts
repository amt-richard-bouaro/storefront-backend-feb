import express from 'express';

// import { isAuthenticated } from '../../middlewares/authenticate';
import { initializeOrder } from './controller/initialize';
import { approveOrder } from './controller/approve';

const app = express.Router();

app.post('/initialize/:storeID', initializeOrder);
app.post('/approve/:orderID', approveOrder);

export default app;
