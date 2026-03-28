import express from "express";
import { getAllUsers, registerUser, verifyOTP } from "../controllers/userController.js";
export const authRouter = express.Router();

authRouter.post( "/register", registerUser );
authRouter.post( '/otp-verification', verifyOTP )
authRouter.get( '/get-all-users', getAllUsers );