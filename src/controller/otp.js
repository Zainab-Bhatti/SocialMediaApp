import userModel from "../model/User.js";
import otpModel from "../model/otp.js";
import loginEmail from "../emails/auth/login.mail.js";
import otpGenerator from "otp-generator";

const otpController={
otp: async (req,res)=>{
    const userName=req.body.name;
    const userEmail=req.body.email;
    const checkUser=await userModel.find({userEmail});
    if(!checkUser) return res.status(401).json({message:"User not found!"});
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const newOtp= await otpModel.create({
      email:userEmail,
      otp:otp
    })
    loginEmail(`Welcome ${userName}!,`,`${userEmail}`,` Following is your OTP code, which will expire in 5 mins:
     ${otp}`);
    return res.json({message:"Otp code send! Check your Email"});
  },
  checkOtp: async (req,res)=>{
    const otp=req.body.otp;
    const useremail=req.body.email;
    const response = await otpModel.find().sort( "-createdAt").limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
     else 
     {
      return res.json({message:"Verification Successful!"})
}
}
};

export default otpController;