import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string({ required_error: "A username is required" })
		.min(3)
		.max(16),
	password: z.string({ required_error: "A password is required" }).min(8),
});
