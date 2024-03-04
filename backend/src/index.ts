import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";

// connect to mongoDB database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("connected to database!");
});

// express init
const app = express();
app.use(express.json());
app.use(cors());

// check server health
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// /api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(1123, () => {
  console.log("server started on localhost: 1123");
});
