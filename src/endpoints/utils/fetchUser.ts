import { Database } from "../../database/dbClient";
import bcrypt from "bcrypt";
import { NEW_ACCOUNT } from "../account/types";
import { SERVER_CONFIG } from "../../config/main";
import { v4 as uuidV4 } from "uuid";
import jwt from 

export const emailExit = async (email: string) => {
	const user = await Database.account.findUnique({
		where: {
			email,
		},
	});

	return user;
};

export const findAccountById = async (id: string) => {
	const user = await Database.account.findUnique({
		where: {
			id,
		},
	});

	return user;
};

export const createAccount = async (data: NEW_ACCOUNT) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE as number);
	const hashedPassword = await bcrypt.hash(data.password, salt);

    let code = await shortCodeGenerator(8);

	const user = await Database.account.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashedPassword,
			type: data.type,
			provider: data.provider,
			verified: data.verified,
			verificationToken: data.verificationToken,
		},
	});

	return user;
};

export const shortCodeGenerator = async (length: number): Promise<string> => {
	const code = uuidV4()
		.replace(/^[a-zA-Z\d]/, "")
		.toUpperCase()
		.slice(0, length);
	return code;
};

export const jwtGenerator = async <T extends {}>(data:T) =>{
    const token = 
}
