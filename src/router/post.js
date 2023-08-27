import { Router } from "express";
import PostController from "../controller/post.js" ;
import { RoleCheck } from "../middleware/rolemiddleware.js";
import { EUserRole } from "../enum/user.js";


const postRouter = new Router();
postRouter.get("/allposts",RoleCheck([EUserRole.admin]),PostController.getAll);
postRouter.get("/specificpost/:id", PostController.getSingle);
postRouter.post("/updatepost/:id", PostController.update);
postRouter.post("/newpost", PostController.create);
postRouter.get("/delpost/:id", PostController.deletePost);
postRouter.post("/likepost",PostController.likePost);
postRouter.post("/dislikepost",PostController.dislikePost);
postRouter.post("/sharepost",PostController.sharePost);
//postRouter.get("/postonemail/:email",PostController.getPostOnEmail);
postRouter.post("/postonemail",RoleCheck([EUserRole.admin]),PostController.getPostOnEmail);
postRouter.post("/searchpost",PostController.searchPost);

export default postRouter;
