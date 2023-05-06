import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { prisma } from "../utils/prisma.server";
import { userAuthSchema } from "../utils/schemas";

let GoogleStrategy = require("passport-google-oidc");
export function signUp(req: Request, res: Response) {
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
						passwordHash: passwordHash.toString(),
						salt: salt.toString(),
					},
				});

				res.redirect(200, "/");
			}
		);
	} catch (error) {
		console.warn(error);
		res.status(400).json(error);
	}
}

export async function signIn(req: Request, res: Response) {
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

		console.log(reqBody);
		// Password hash as Buffer is different from saved string Buffer
		crypto.pbkdf2(
			reqBody.password,
			user.salt,
			310000,
			32,
			"sha256",
			async (error, passwordHash) => {
				if (error) throw new Error(error.message);

				const passwordBuffer = Buffer.from(user.passwordHash, "utf-8");
				if (!crypto.timingSafeEqual(passwordBuffer, passwordHash)) {
					res.status(401).send({
						accessToken: null,
						message: "Invalid password.",
					});
				}

				const token = jwt.sign(
					{
						id: user.id,
					},
					process.env.API_SECRET,
					{
						expiresIn: 86400,
					}
				);

				res.status(200).send({
					user: {
						id: user.id,
						username: user.username,
						email: user.email,
					},
					message: "Login successfull",
					accessToken: token,
				});
			}
		);
	} catch (error) {
		console.warn(error);
		res.status(400).json(error);
	}
}
