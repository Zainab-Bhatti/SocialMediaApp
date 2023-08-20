import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const mainRouter = new Router();


mainRouter.use(userRouter);
mainRouter.use(postRouter);
mainRouter.use(authRouter);
export default mainRouter;
