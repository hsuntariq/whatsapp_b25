import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { authRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import { connectDB } from "./database/connect.js";
import cors from 'cors'
dotenv.config();

// For ESM (import syntax)
import dns from "node:dns/promises";
import { chatRouter } from "./routes/chatRoutes.js";
dns.setServers( ["1.1.1.1", "1.0.0.1", "8.8.8.8"] );

// // OR for CommonJS (require syntax)
// const dns = require("node:dns/promises");
// dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);

const app = express();
app.use( cors() )
connectDB();

app.use( express.json() );
app.use( express.urlencoded() );

app.use( "/api/auth", authRouter );
app.use( "/api/chat", chatRouter );

app.use( errorHandler );

app.listen( process.env.PORT, () => {
  console.log( `Server started on port:${process.env.PORT.yellow}` );
} );
