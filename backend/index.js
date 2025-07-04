import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";

/* App Config */
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
  console.log("Server is running");
});
