import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";

const app = express();

// connecting db
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mainRouter);

const port =process.env.PORT || 3301;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
