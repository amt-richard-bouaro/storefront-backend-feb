import { z } from 'zod';

export const S3_BUCKET = {
	REGION: process.env.AWS_BUCKET_REGION!,
	NAME: process.env.AWS_BUCKET_NAME!,
	ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID!,
	SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
};

const S3_BUCKET_SCHEMA = z.object({
	REGION: z.string().nonempty('S3 region cannot be empty'),
	NAME: z.string().nonempty('S3  name cannot be empty'),
	ACCESS_KEY: z.string().nonempty('S3 access_key cannot be empty'),
	SECRET_KEY: z.string().nonempty('S3 secrete_key cannot be empty'),
});

type S3_BUCKET_SCHEMA = z.infer<typeof S3_BUCKET_SCHEMA>;
export const validateS3BucketConfig = (config: S3_BUCKET_SCHEMA) => {
	const result = S3_BUCKET_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid S3 bucket config: ${result.error}`);
	}

	return config;
};
