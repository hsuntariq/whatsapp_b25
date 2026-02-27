import express from "express";
import { registerUser } from "../controllers/userController.js";
export const authRouter = express.Router();

authRouter.post("/register", registerUser);
