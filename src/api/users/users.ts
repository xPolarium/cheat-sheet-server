import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma";
import { authorizeToken } from "../../middleware/authorizeToken";

export const usersRouter = Router();

usersRouter.get("/users", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		select: { id: true, email: true, username: true, page: true },
	});

	res.status(200).json(users);
});
