import { Router } from "express";
import UserController from "../controller/user.js";

const userRouter = new Router();
userRouter.get("/users", UserController.getAll);
userRouter.get("/user/:id", UserController.getSingle);
userRouter.get("/checkpost/:id",UserController.checkPosts)
userRouter.post("/user", UserController.create);
userRouter.put("/user/:id", UserController.update);

export default userRouter;
