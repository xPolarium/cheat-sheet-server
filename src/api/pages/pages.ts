import { Request, Response, Router } from "express";

import { prisma } from "../../utils/prisma.server";

export const pagesRouter = Router();

pagesRouter.get("/pages", (req: Request, res: Response) => {
	res.json("You've reach the /api/pages endpoint!");
});
