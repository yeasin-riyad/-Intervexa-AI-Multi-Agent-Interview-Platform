import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser"
dotenv.config();

const port = process.env.PORT;
const app=express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello from auth service"});
})

app.use("/",authRouter);


app.listen(port,async()=>{
    console.log(`Auth services Started at ${port}`);
    await connectDb();
})