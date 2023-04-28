import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import { apiRouter } from "./api/api";

const app = express();

const SERVER_PORT = 3000;

declare module "express-serve-static-core" {
	interface Request {
		prisma: PrismaClient;
	}
}

app.use((req: Request, res: Response, next: NextFunction) => {
	const prisma = new PrismaClient();
	req.prisma = prisma;
	next();
});

app.use("/api", apiRouter);

app.listen(SERVER_PORT, () => {
	console.log(`LISTENING ON PORT http://localhost:${SERVER_PORT}/`);
});
