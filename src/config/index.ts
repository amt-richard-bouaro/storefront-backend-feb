import {
	SERVER_CONFIG as serverConfig,
	GOOGLE_API as googleApiConfig,
	S3_BUCKET as s3BucketConfig,
	FACEBOOK_API as facebookApiConfig,
} from './main';
import {
	validateGoogleApiConfig,
	validateServerConfig,
	validateS3BucketConfig,
	validateFacebookApiConfig,
} from './types';

const SERVER_CONFIG = validateServerConfig(serverConfig);
const GOOGLE_API = validateGoogleApiConfig(googleApiConfig);
const S3_BUCKET = validateS3BucketConfig(s3BucketConfig);
const FACEBOOK_API = validateFacebookApiConfig(facebookApiConfig);

export { SERVER_CONFIG, GOOGLE_API, S3_BUCKET, FACEBOOK_API };
