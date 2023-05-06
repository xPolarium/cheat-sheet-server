import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma";
import { cookieJwtAuth } from "../../middleware/cookieJwtAuth";

export const usersRouter = Router();

usersRouter.get(
	"/users",
	cookieJwtAuth,
	async (req: Request, res: Response) => {
		const user = req.user;

		const users = await prisma.user.findMany({
			select: { id: true, email: true, username: true, page: true },
		});

		res.status(200).json(users);
	}
);
