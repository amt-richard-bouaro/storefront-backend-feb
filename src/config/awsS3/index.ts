import { z } from 'zod';

const S3_BUCKET_SCHEMA = z.object({
	REGION: z.string().trim().nonempty('S3 region cannot be empty'),
	NAME: z.string().trim().nonempty('S3  name cannot be empty'),
	ACCESS_KEY: z.string().trim().nonempty('S3 access_key cannot be empty'),
	SECRET_KEY: z.string().trim().nonempty('S3 secrete_key cannot be empty'),
});

export const s3Cofig = S3_BUCKET_SCHEMA.safeParse({
	REGION: process.env.AWS_BUCKET_REGION!,
	NAME: process.env.AWS_BUCKET_NAME!,
	ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID!,
	SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
});

if (!s3Cofig.success) {
	throw new Error(`Invalid s3 bucket config: ${s3Cofig.error}`);
}

const S3_BUCKET = s3Cofig.data;

export default S3_BUCKET;
