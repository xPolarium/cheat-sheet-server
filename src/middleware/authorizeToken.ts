import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "@prisma/client";

export function authorizeToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.cookies.token;
	try {
		const user = jwt.verify(token, process.env.API_SECRET);

		req.user = user as User;
		next();
	} catch (error) {
		res.clearCookie("token");
		res.redirect("/");
	}
}
