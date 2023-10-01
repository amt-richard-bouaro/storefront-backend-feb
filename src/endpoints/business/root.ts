import express from 'express';

import { setBusinessType } from './controller/setBusinessType';
import { newStore } from './controller/newStore';
import { isAuthenticated } from '../../middlewares/authenticate';
import { getBusiness } from './controller/getBusinnes';
import { saveTemplate } from './controller/saveTemplateChanges';
import { publishTemplate } from './controller/publishTemplateChanges';
import { addTeamMember } from './controller/addTeamMember';
import { imageUpload } from '../../middlewares/uploader';
import { addReasonWhy } from './controller/addReasonwhy';
import { addCategory } from './controller/addcategory';
import { deleteCategory } from './controller/deleteCategory';
import { getBusinessStores } from './controller/businessStore';

const app = express.Router();

app.patch('/set/type/:businessID', isAuthenticated, setBusinessType);
app.post('/store/new/:businessID', isAuthenticated, newStore);
app.post('/store/category/add/:storeID', isAuthenticated, addCategory);
app.delete(
	'/store/category/delete/:categoryID',
	isAuthenticated,
	deleteCategory
);
app.get('/stores/:id', isAuthenticated, getBusinessStores);
app.get('/:id', isAuthenticated, getBusiness);
app.patch(
	'/template/save/:tempID',
	isAuthenticated,
	imageUpload.single('brandImage'),
	saveTemplate
);
app.put('/template/publish/:tempID', isAuthenticated, publishTemplate);
app.post(
	'/teams/add/:tempID',
	isAuthenticated,
	imageUpload.single('picture'),
	addTeamMember
);
app.post('/reasons/add/:tempID', isAuthenticated, addReasonWhy);

export default app;
