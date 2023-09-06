import { z } from "zod";

const ACOUNT_TYPES = ["Business", "Customer"] as const;
const ACCOUNT_PROVIDERS = ["local", "google", "facebook"] as const;

const NEW_ACCOUNT = z
	.object({
		email: z.string().email("Please provide a valid email address"),
		password: z
			.string()
            .refine(val => !val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/),
			"Password must be at least 10 characters long, contain at least one number, have at least one lowercase letter, and have at least one uppercase letter."),
		type: z.enum(ACOUNT_TYPES),
		provider: z.enum(ACCOUNT_PROVIDERS),
		name: z.string(),
		verificationToken: z.string().optional(),
		verified: z.boolean().optional()
	})
	


type NEW_ACCOUNT = z.infer<typeof NEW_ACCOUNT>


export { NEW_ACCOUNT };
