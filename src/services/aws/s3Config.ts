import { S3_BUCKET } from '../../config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import logger from '../../middlewares/logger';

const s3 = new S3Client({
	region: S3_BUCKET.REGION,
	credentials: {
		accessKeyId: S3_BUCKET.ACCESS_KEY,
		secretAccessKey: S3_BUCKET.SECRET_KEY,
	},
});

export const deleteObject = async (fileKey: string) => {
	const deleteParameters = {
		Key: fileKey,
		Bucket: S3_BUCKET.NAME,
	};

	try {
		const deleteObjectCommand = new DeleteObjectCommand(deleteParameters);
		const response = await s3.send(deleteObjectCommand);

		return response['$metadata'].httpStatusCode;
	} catch (error) {
		const err = error as Error;
		logger.error(err.message);
		return false;
	}
};
