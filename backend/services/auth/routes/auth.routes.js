import express from "express";
import { demoLogin, googleAuth, logout, useCoins } from "../controllers/auth.controller.js";

const authRouter=express.Router();


authRouter.post("/login",googleAuth);
authRouter.post("/logout",logout);
authRouter.post("/use-coins",useCoins);
authRouter.post("/demo-login", demoLogin);
export default authRouter;