import express from 'express';

import { getStores } from './controller/allStores';

import { isAuthenticated } from '../../middlewares/authenticate';
import { getStore } from './controller/getStore';

const app = express.Router();

app.get('/all', isAuthenticated, getStores);
app.get('/:store_id', isAuthenticated, getStore);

export default app;
