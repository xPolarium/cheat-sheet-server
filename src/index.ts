import express from "express";

import { pagesRouter, usersRouter } from "./api/apiRoutes";
import { authRouter } from "./auth";

const app = express();

const SERVER_PORT = 3000;

app.use("/api", usersRouter);
app.use("/api", pagesRouter);

app.use("/", authRouter);

app.listen(SERVER_PORT, () => {
	console.log(`LISTENING ON PORT http://localhost:${SERVER_PORT}/`);
});
