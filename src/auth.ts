import { Router } from "express";

import { signIn, signUp } from "./utils/userAuth";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", signIn);
