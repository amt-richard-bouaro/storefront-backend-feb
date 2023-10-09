import { SERVER_CONFIG as serverConfig, validateServerConfig } from './server';
import { S3_BUCKET as s3BucketConfig, validateS3BucketConfig } from './awsS3';
import {
	GOOGLE_API as googleApiConfig,
	validateGoogleApiConfig,
} from './google';
import {
	FACEBOOK_API as facebookApiConfig,
	validateFacebookApiConfig,
} from './facebook';
import {
	PAYPAL_API as PayPalApiConfig,
	validatePayPalApiConfig,
} from './paypal';

const SERVER_CONFIG = validateServerConfig(serverConfig);
const GOOGLE_API = validateGoogleApiConfig(googleApiConfig);
const S3_BUCKET = validateS3BucketConfig(s3BucketConfig);
const FACEBOOK_API = validateFacebookApiConfig(facebookApiConfig);
const PAYPAL_API = validatePayPalApiConfig(PayPalApiConfig);

export { SERVER_CONFIG, GOOGLE_API, S3_BUCKET, FACEBOOK_API, PAYPAL_API };
