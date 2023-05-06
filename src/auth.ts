import { Request, Response, Router } from "express";
import crypto from "crypto";

import { userAuthSchema } from "./utils/schemas";
import { prisma } from "./utils/prisma";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
	try {
		const reqBody = userAuthSchema.parse(req.body);

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
						passwordHash,
						salt,
					},
				});

				res.redirect(200, "/");
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
});

authRouter.post("/login", async (req: Request, res: Response) => {
	try {
		const reqBody = userAuthSchema.parse(req.body);

		const user = await prisma.user.findFirst({
			where: { username: reqBody.username },
		});

		if (!user) {
			res.status(404).send({
				message: "User not found.",
			});
		}

		crypto.pbkdf2(
			reqBody.password,
			user.salt,
			310000,
			32,
			"sha256",
			async (error, passwordHash) => {
				if (error) throw new Error(error.message);

				if (!crypto.timingSafeEqual(user.passwordHash, passwordHash)) {
					res.status(401).send({
						accessToken: null,
						message: "Invalid password.",
					});
				}

				const token = jwt.sign(
					{
						id: user.id,
						username: user.username,
						email: user.email,
					},
					process.env.API_SECRET,
					{
						expiresIn: "30d",
					}
				);

				res.cookie("token", token, { httpOnly: true });
				res.redirect(200, "/");
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
});
