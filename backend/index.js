import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";

/* App Config */
dotenv.config();
connectDB();

/* Middleware */
const app = express();
app.use(express.json());
app.use(cors());

/* API endpoints */
app.use("/api/auth", userRoute);
app.use("/api/todos", todoRoute);

/* Connection */
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(8080, () => {
  console.log("Server is running");
});
