import { z } from "zod";

export const userAuthSchema = z.object({
	username: z
		.string({ required_error: "A username is required" })
		.min(3)
		.max(16),
	password: z.string({ required_error: "A password is required" }).min(8),
});

export const pageSchema = z.object({
	title: z.string().min(5).max(24, { message: "Keep it short and simple." }),
});
