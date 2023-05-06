import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function cookieJwtAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;
	try {
		const user = jwt.verify(token, process.env.API_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.clearCookie("token");
		res.redirect("/");
	}
}
