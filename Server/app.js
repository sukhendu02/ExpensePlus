import express from 'express';
import helmet from 'helmet';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

import {errorHandler,notFoundHandler} from "./src/middleware/ErrorHandler.js";
import expenseRoute from "./src/modules/expenses/route/expenseRoute.js";
import statsRoute from "./src/modules/stats/route/statsRoute.js"

const app = express();

// HELMET MIDDLEWARE FOR SECURITY HEADERS
app.use(helmet());


// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);

// MIDDLEWARE TO PARSE JSON REQUEST BODIES
app.use(express.json());


// ROUTE FOR EXPENSES
app.use("/api/v1/expense",expenseRoute)

// ROUTE FOR STATS
app.use("/api/v1/stats",statsRoute)


// HEALTH CHECK ENDPOINT    
app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Server is healthy",
        status:"ok"
    })
})


// ERROR 404 HANDLER
app.use(notFoundHandler);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;