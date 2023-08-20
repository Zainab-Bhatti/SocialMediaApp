import bcryptjs from "bcryptjs";
import userModel from "../model/User.js";
const authController={
login : async (req, res, next) => {
        const { name, email } = req.body
        // Check if name and email is provided
        if (!name || !email) {
          return res.status(400).json({
            message: "Invalid Credentials!",
          })
        }
        try {
            const user = await userModel.findOne({ name, email })
            if (!user) {
              res.status(401).json({
                message: "Login not successful",
                error: "Invalid Credentials!",
              })
            }         
          
            else {
                return res.status(200).json({
                message: "Login successful",
                user,
              })
            }
        }
           catch (error) {
            res.status(400).json({
              message: "An error occurred",
              error: error.message,
            })
          }          
        }
    
    }

export default authController;