// import fetch from 'node-fetch';
// import { PAYSTACK_API } from '../../config/main';

// const baseURL = PAYSTACK_API.PAYSTACK_BASE_URL;
// const fetchApi = async (
// 	url: string,
// 	body?: BodyInit,
// 	args?: Record<string, string>,
// 	options?: RequestInit
// ) => {
// 	try {
// 		const urlObject = new URL(url, baseURL);

// 		if (args) {
// 			urlObject.search = new URLSearchParams(args).toString();
//         }

//         const requestOptions = { ...options, body };

//         const response = await fetch(urlObject.toString(), requestOptions);

// 	} catch (error) {
// 		const err = error as Error;

// 		throw err;
// 	}
// };
