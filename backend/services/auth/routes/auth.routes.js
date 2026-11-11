import express from "express";
import { googleAuth, logout, useCoins } from "../controllers/auth.controller.js";

const authRouter=express.Router();


authRouter.post("/login",googleAuth);
authRouter.post("/logout",logout);
authRouter.post("/use-coins",useCoins);

export default authRouter;