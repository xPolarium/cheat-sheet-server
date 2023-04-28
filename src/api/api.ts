import { Request, Response, Router } from "express";

import { usersRouter } from "./users/users";
import { pagesRouter } from "./pages/pages";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/pages", pagesRouter);

apiRouter.get("/", (req: Request, res: Response) => {
	res.json("You've reach the /api endpoint!");
});
