import { NextFunction, Request, Response, Router } from "express";
import crypto from "crypto";

import { prisma } from "./utils/prisma.server";
import { registerSchema } from "./utils/schemas";

export const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
	try {
		const reqBody = registerSchema.parse(req.body);

		const salt = crypto.randomBytes(16);

		crypto.pbkdf2(
			reqBody.password,
			salt,
			310000,
			32,
			"sha256",
			async (error, passwordHash) => {
				if (error) throw new Error(error.message);

				const { id, username } = await prisma.user.create({
					data: {
						username: reqBody.username,
						passwordHash: passwordHash.toString(),
						salt: salt.toString(),
					},
				});

				res.status(200).json({ id, username });
			}
		);
	} catch (error) {
		console.warn(error);
		res.status(400).json(error);
	}
});
