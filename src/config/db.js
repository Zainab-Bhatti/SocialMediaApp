import mongoose from "mongoose";

const connectDB = async () => {
  
const uri =process.env.DB_URI;
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
