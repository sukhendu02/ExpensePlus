import express from 'express';
import helmet from 'helmet';

import dotenv from 'dotenv'
dotenv.config();

const app = express();

// HELMET MIDDLEWARE FOR SECURITY HEADERS
app.use(helmet());

// HEALTH CHECK ENDPOINT    
app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Server is healthy",
        status:"ok"
    })
})

export default app;