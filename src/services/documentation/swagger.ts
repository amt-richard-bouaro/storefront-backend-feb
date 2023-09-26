import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

const customOptions = {
	customSiteTitle: 'Store Front Api',
	customCssUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.1/swagger-ui.min.css',
};

const spec = JSON.parse(
	fs.readFileSync(path.join(__dirname, './docs.json'), 'utf8')
);

function swaggerDocs(app: Express) {
	app.use(
		'/api/v1/docs',
		swaggerUi.serve,
		swaggerUi.setup(spec, { ...customOptions })
	);
}

export default swaggerDocs;
