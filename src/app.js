import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";


const app = express();

// connecting db
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mainRouter);
app.listen(3302, () => {
  console.log("listening on 3302");
});
