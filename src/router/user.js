import { Router } from "express";
import UserController from "../controller/user.js";
import pathAuthentication from "../middleware/authmiddleware.js";
import authController from "../controller/auth.js";
import otpController from "../controller/otp.js";
import { RoleCheck } from "../middleware/rolemiddleware.js";
import { EUserRole } from "../enum/user.js";
import uservalidator from "../validators/uservalidation.js";
const userRouter = new Router();
userRouter.get("/users",pathAuthentication,RoleCheck([EUserRole.admin]),UserController.getAll);
userRouter.get("/user/:id",UserController.getSingle);
userRouter.get("/checkpost/:id",UserController.checkPosts)
userRouter.post("/login",pathAuthentication,uservalidator.create,UserController.create);
userRouter.post("/otp",otpController.otp);
userRouter.post("/otpverify",otpController.checkOtp);
userRouter.put("/user/:id", UserController.update);
userRouter.post("/userlogin",authController.login);
userRouter.post("/searchuser",UserController.searchUser);

export default userRouter;
