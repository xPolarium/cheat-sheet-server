import express from "express";

import dotenv from "dotenv";

import { pagesRouter, usersRouter } from "./api/apiRoutes";
import { authRouter } from "./auth";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", usersRouter);
app.use("/api", pagesRouter);

app.use("/", authRouter);

app.get("/", () => {
	return "Hello";
});

app.listen(process.env.SERVER_PORT, () => {
	console.log(
		`LISTENING ON PORT http://localhost:${process.env.SERVER_PORT}/`
	);
});
