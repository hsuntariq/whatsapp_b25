import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { authRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import { connectDB } from "./database/connect.js";
dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port:${process.env.PORT.yellow}`);
});
