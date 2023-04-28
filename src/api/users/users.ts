import { Request, Response, Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
	const users = await req.prisma.user.findMany({
		include: {
			page: { include: { keybinds: true } },
		},
	});

	res.status(200).json(users);
});
