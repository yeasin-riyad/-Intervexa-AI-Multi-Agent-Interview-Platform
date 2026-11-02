import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import interviewRouter from './routes/interview.route.js';
dotenv.config();

const port = process.env.PORT;
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello from interview service"});
})

app.use("/",interviewRouter);



app.listen(port,async()=>{
    console.log(`Interview services Started at ${port}`);
    await connectDb();
})