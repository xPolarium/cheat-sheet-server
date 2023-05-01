import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma.server";

export const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		include: {
			page: { include: { keybinds: true } },
		},
	});

	res.status(200).json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
	const users = await prisma.user.findFirst({
		where: {
			id: Number(req.params.id),
		},
	});

	res.status(200).json(users);
});
