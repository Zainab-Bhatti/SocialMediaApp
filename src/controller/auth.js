import bcrypt from "bcrypt";
import userModel from "../model/User.js";
import jwt from "jsonwebtoken";
import loginEmail from "../emails/auth/login.mail.js";

const authController={
login : async (req, res, next) => {
        const { name, email, password } = req.body
        // Check if name and email is provided
        if (!name || !email || !password) {
          return res.status(400).json({
            message: "Data Missing!",
          })
        }
        try {
            const user = await userModel.findOne({ name, email });
            const result = await bcrypt.compare(req.body.password, user.password);
            if (!user) {
              res.status(401).json({
                message: "Login not successful",
                error: "Invalid Credentials!",
              })
            }   
            else if(!result){
              res.status(401).json({
                message: "Login not successful",
                error: "Invalid Credentials!",
              })
            }
          
            else {
                  // sign token and send it in response
                  const token = await jwt.sign({ name: user.name,email:user.email,id:user.id },process.env.SECRET_KEY,{
                    algorithm:"HS256",
                    expiresIn:"24h"
                  });
                 loginEmail(`Welcome ${user.name}!`,`${user.email}`);
                  return res.status(200).json({
                message: "Login successful",
                user, token})
                
            }
        }
           catch (error) {
            res.status(400).json({
              message: "An error occurred",
              error: error.message,
            })
          }          
        }
    
      };    
export default authController;