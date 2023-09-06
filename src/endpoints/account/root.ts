import express from 'express';

const app = express.Router();

import {localRegistration} from './controller/localRegistration'
app.post('/register/local', localRegistration)


export default app