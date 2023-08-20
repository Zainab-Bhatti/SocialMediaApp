import { Router } from "express";
import PostController from "../controller/post.js";

const postRouter = new Router();
postRouter.get("/posts", PostController.getAll);
postRouter.get("/post/:id", PostController.getSingle);
postRouter.post("/post/:id", PostController.update);
postRouter.post("/newpost", PostController.create);
postRouter.get("/delpost/:id", PostController.deletePost);

export default postRouter;
