import express from "express";
import type { Response, Request, NextFunction } from "express";

import { apiRouter } from "./api/api";

const app = express();

const SERVER_PORT = 3000;

app.use("/api", apiRouter);

app.listen(SERVER_PORT, () => {
	console.log(`LISTENING ON PORT http://localhost:${SERVER_PORT}/`);
});
