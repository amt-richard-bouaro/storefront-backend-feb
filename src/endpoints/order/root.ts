import express from 'express';

// import { isAuthenticated } from '../../middlewares/authenticate';
// import { paystack } from './controller/paystack';
import { initializeOrder } from './controller/initialize';
import { approveOrder } from './controller/approve';

const app = express.Router();

app.post('/initialize/:storeID', initializeOrder);
app.post('/approve/:orderID', approveOrder);

export default app;
