import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();
import proxy from "express-http-proxy"
import { getCurrentUser } from "./controller/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

const port = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(cookieParser());


app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/resume",isAuth,proxyWithHeaders(process.env.RESUME_SERVICE_URL));
app.get("/api/me",isAuth,getCurrentUser)


app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from api Gateway" });
});
app.listen(port, () => {
  console.log(`Api Gateway Started at ${port}`);
});