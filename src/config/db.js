import mongoose from "mongoose";

const connectDB = async () => {
  
const uri = "mongodb+srv://zainabbhatti808:zainabfirstmay2001@cluster0.i6cukun.mongodb.net/SocialApp";
  mongoose.connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Successful db connection");
    })
    .catch((err) => {
      console.log("Error connecting db connection", err);
    });
};

export default connectDB;
