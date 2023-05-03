import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma.server";

export const usersRouter = Router();

usersRouter.get("/users", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		include: {
			page: { include: { keybinds: true } },
		},
	});

	res.status(200).json(users);
});
