import { Request, Response, Router } from "express";

export const pagesRouter = Router();

pagesRouter.get("/", (req: Request, res: Response) => {
	res.json("You've reach the /api/pages endpoint!");
});
