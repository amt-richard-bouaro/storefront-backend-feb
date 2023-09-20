import express from 'express';

// import { isAuthenticated } from '../../middlewares/authenticate';
import { paystack } from './controller/paystack';

const app = express.Router();

app.post('/initialize', paystack);

export default app;
