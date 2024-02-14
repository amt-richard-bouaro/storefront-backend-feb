import { S3_BUCKET } from '../../config';
import {
	S3Client,
	DeleteObjectCommand,
	PutObjectCommand,
	CompleteMultipartUploadCommandOutput,
	AbortMultipartUploadCommandOutput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import logger from '../../middlewares/logger';
// import util from 'util';
import tinify from 'tinify';
import { SERVER_CONFIG } from '../../config';

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

export const uploadObject = async (
	fileKey: string,
	fileBuffer: Buffer,
	contentType: string
) => {
	const uploadParameters = {
		Key: fileKey,
		Bucket: S3_BUCKET.NAME,
		Body: fileBuffer,
		ContentType: contentType,
	};

	try {
		const uploadObjectCommand = new PutObjectCommand(uploadParameters);
		const response = await s3.send(uploadObjectCommand);

		return response['$metadata'].httpStatusCode;
	} catch (error) {
		const err = error as Error;
		logger.error(err.message);
		return false;
	}
};

tinify.key = SERVER_CONFIG.TINIFY_API_KEY;
export const sendFileToS3 = async (file: Express.Multer.File) => {
	const compressedImage = tinify.fromBuffer(file.buffer);

	const uint8Array = await compressedImage.toBuffer();

	const buffer = Buffer.from(uint8Array);

	const params = {
		Bucket: S3_BUCKET.NAME,
		Key: 'STRFRNTSMES-' + Date.now() + '-' + file.originalname,
		ACL: 'public-read',
		Body: buffer,
	};

	const upload = new Upload({
		client: s3,
		params,
	});

	let currentSize = 0;

	upload.on('httpUploadProgress', function (ev) {
		if (ev.total) currentSize = ev.total;
	});

	const result = await upload.done();

	if (!isComplete(result)) {
		throw new Error('Error occurred while trying to upload file', {
			cause: 'File upload',
		});
	}

	const { Location, Key } = result;

	if (Location === undefined || Key === undefined) {
		throw new Error('Error occurred while trying to upload file', {
			cause: 'File upload',
		});
	}

	return {
		size: currentSize,
		bucket: S3_BUCKET.NAME,
		key: result.Key,
		ACL: 'public-read',
		location: result.Location,
		etag: result.ETag,
		versionId: result.VersionId,
	};
};

function isComplete(
	output:
		| CompleteMultipartUploadCommandOutput
		| AbortMultipartUploadCommandOutput
): output is CompleteMultipartUploadCommandOutput {
	return (output as CompleteMultipartUploadCommandOutput).ETag !== undefined;
}
