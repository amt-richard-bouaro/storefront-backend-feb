import express from 'express';

import { updateOnboarding } from '../business/controller/updateOnboarding';
import { newStoreTemplate } from '../business/controller/newStoreTemplate';
import { isAuthenticated } from '../../middlewares/authenticate';
import { getBusiness } from './controller/getBusinnes';
import { saveTemplate } from './controller/saveTemplateChanges';
import { publishTemplate } from './controller/publishTemplateChanges';

const app = express.Router();

app.put('/onboarding/update/:id', isAuthenticated, updateOnboarding);
app.post('/template/new/:id', isAuthenticated, newStoreTemplate);
app.get('/:id', isAuthenticated, getBusiness);
app.put('/template/save/:id', isAuthenticated, saveTemplate);
app.put('/template/publish/:id', isAuthenticated, publishTemplate);

export default app;
