import { Database } from "../../database/dbClient";
import { MAIL_OPTIONS } from "../../services/generalTypes";
import bcrypt from "bcrypt";
import { NEW_ACCOUNT } from "../account/types";
import { SERVER_CONFIG } from "../../config/main";
import { v4 as uuidV4 } from "uuid";
import jwt from "jsonwebtoken";
import nodemailer, { SentMessageInfo } from "nodemailer";

export const findAccountByEmail = async (email: string) => {
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

	const code = await shortCodeGenerator(8);

	const verificationToken = jwtGenerator(code);

	const user = await Database.account.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashedPassword,
			type: data.type,
			provider: data.provider,
			verified: data.verified,
			verificationToken: verificationToken,
		},
		select: {
			id: true,
			password: false,
			name: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
		},
	});

	return user;
};

export const passwordValidator = async (password: string, validateWith:string):Promise<boolean> => { 
	const isValid = await bcrypt.compare(password, validateWith);

	return isValid 
}

export const shortCodeGenerator = async (length: number): Promise<string> => {
	const code = uuidV4()
		.replace(/^[a-zA-Z\d]/, "")
		.toUpperCase()
		.slice(0, length);
	return code;
};

export const jwtGenerator = <T extends {}>(data: T): string => {
	const token = jwt.sign(data, SERVER_CONFIG.JWT_SECRET);

	return token;
};

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: SERVER_CONFIG?.EMAIL_ADDRESS,
		pass: SERVER_CONFIG?.EMAIL_PASSWORD,
	},
});

export const mailOptions = (options: MAIL_OPTIONS) => {
	return {
		from:
			{
				name: "Store Front",
				address: SERVER_CONFIG.EMAIL_ADDRESS,
			} || options.from,
		to: options.to,
		subject: options.subject,
		text: options.text || "",
		html: options.html || "",
	};
};

export const sendMail = async (
	mailOptions: MAIL_OPTIONS,
	callback?: (err: Error | null, info: SentMessageInfo) => void
) => {
	try {

		transport.sendMail(mailOptions, callback)
		
	} catch (error) {

		throw new Error(error)
	}
};
