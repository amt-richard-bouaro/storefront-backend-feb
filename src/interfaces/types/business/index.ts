import { USER } from "../account";
import { STORE } from "../store";

type BUSINESS = {
	id: string;
	businessName: string;
	businessType: string | null;
	stores?: STORE[];
	addresses?: BUSINESS_ADDRESS[];
	businessAccount?: USER[];
};

 type BUSINESS_ADDRESS = {
	id: string;
	country: string;
	streetAddress: string;
	appartmentNo: string;
	city: string;
	phone: string;
	business: string;
	businessAddress: BUSINESS;
};


export {BUSINESS, BUSINESS_ADDRESS}