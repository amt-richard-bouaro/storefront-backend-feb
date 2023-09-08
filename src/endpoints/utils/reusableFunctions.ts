import { Database } from "../../database/dbClient";
import { MAIL_OPTIONS } from "../../services/generalTypes";
import bcrypt from "bcrypt";
import { NEW_ACCOUNT } from "../account/types";
import { SERVER_CONFIG, STATUS } from "../../config/main";
import { v4 as uuidV4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer, { SentMessageInfo } from "nodemailer";

export const findAccountByEmail = async (email: string) => {
	const user = await Database.account.findUnique({
		where: {
			email,
		},
		include: {
			customer: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
			business: {
				select: {
					id: true,
					businessName: true,
					businessType: true,
				},
			},
		},
	});

	return user;
};

export const verifyAccount = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			verified: true,
		},
		select: {
			id: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			mustChangePassword: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			customer: true,
			business: true,
		},
	});

	return user;
};
export const findAccountById = async (id: string) => {
	const user = await Database.account.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			mustChangePassword: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			customer: true,
			business:true
		},
	});

	return user;
};

export const createAccount = async (data: NEW_ACCOUNT) => {
	
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const hashedPassword = await bcrypt.hash(data.password, salt);

	const code = await shortCodeGenerator(6);

	const verificationToken = jwtGenerator({ email: data.email, code });

	const user =
		data.type === "Customer"
			? await Database.customer.create({
					data: {
						firstName: data.firstName,
						lastName: data.lastName,

						customerAccount: {
							create: {
								email: data.email,
								password: hashedPassword,
								type: data.type,
								provider: data.provider,
								verified: data.verified,
								isActive: data.isActive,
								verificationToken: verificationToken,
							},
						},
					},
					select: {
						firstName: true,
						lastName: true,
						customerAccount: {
							select: {
								id: true,
								email: true,
								type: true,
								provider: true,
								verified: true,
								verificationToken: true,
								mustChangePassword: true,
								isActive: true,
								password: false,
								createdAt: true,
								updatedAt: true,
							},
						},
					},
			  })
			: await Database.business.create({
					data: {
						businessName: data.businessName,
						businessAccount: {
							create: {
								email: data.email,
								password: hashedPassword,
								type: data.type,
								provider: data.provider,
								verified: data.verified,
								isActive: data.isActive,
								verificationToken: verificationToken,
							},
						},
					},
					select: {
						businessName: true,
						businessAccount: {
							select: {
								id: true,
								email: true,
								type: true,
								provider: true,
								verified: true,
								verificationToken: true,
								mustChangePassword: true,
								isActive: true,
								password: false,
								createdAt: true,
								updatedAt: true,
							},
						},
					},
			  });
	
	

	return {user, email: data.email, code };
};

export const passwordValidator = async (
	password: string,
	validateWith: string
): Promise<boolean> => {
	const isValid = await bcrypt.compare(password, validateWith);

	return isValid;
};

export const shortCodeGenerator = async (length: number): Promise<string> => {
	const code = uuidV4()
		.replace(/^[a-zA-Z\d]/, "")
		.toUpperCase()
		.slice(0, length);
	return code;
};

interface JWT_PAYLOAD extends JwtPayload {
	email: string;
	code: string;
}

export const jwtGenerator = <T extends { email: string; code: string }>(
	data: T
): string => {
	const token = jwt.sign(data, SERVER_CONFIG.JWT_SECRET, {
		expiresIn: "1h",
	});

	return token;
};

export const extractJwtPayload = (token: string) => {
	const payload: JWT_PAYLOAD = jwt.verify(
		token,
		SERVER_CONFIG.JWT_SECRET
	) as JWT_PAYLOAD;

	return payload;
};

const transport = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: true,
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
		const info = transport.sendMail(mailOptions, callback);

		return info;
	} catch (err) {
		if (err.code === "ENOTFOUND") {
			return {
				status: STATUS.NOT_FOUND,
				message: "The email server could not be found.",
			};
		} else {
			return {
				status: STATUS.INTERNAL_SERVER_ERROR,
				message: "An error occurred while sending the email.",
			};
		}
	}
};

