import multer from 'multer';
import multerS3 from 'multer-s3';

import { S3_BUCKET } from '../config';
import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';

const s3 = new S3Client({
	region: S3_BUCKET.REGION,
	credentials: {
		accessKeyId: S3_BUCKET.ACCESS_KEY,
		secretAccessKey: S3_BUCKET.SECRET_KEY,
	},
});

const storage = multerS3({
	s3,
	acl: 'public-read',
	bucket: S3_BUCKET.NAME,
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname });
	},

	key: function (req, file, callback) {
		const uniquePrefix = 'STRFRNTSMES-' + Date.now();
		callback(null, uniquePrefix + '-' + file.originalname);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) => {
	if (file.mimetype.split('/')[0] !== 'image') {
		callback(new Error('Unsupported file type'));
	} else {
		callback(null, true);
	}
};

export const imageUpload = multer({
	storage: storage,
	limits: {
		fileSize: 3 * 1024 * 1024,
	},
	fileFilter,
});

export const incomingFile = multer({
	limits: {
		fileSize: 4194304,
	},
	fileFilter,
});
