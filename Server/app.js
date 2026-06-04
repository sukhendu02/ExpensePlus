import express from 'express';
import helmet from 'helmet';

import dotenv from 'dotenv'
dotenv.config();

import {errorHandler,notFoundHandler} from "./src/middleware/ErrorHandler.js";
import expenseRoute from "./src/modules/expenses/route/expenseRoute.js";


const app = express();

// HELMET MIDDLEWARE FOR SECURITY HEADERS
app.use(helmet());

// MIDDLEWARE TO PARSE JSON REQUEST BODIES
app.use(express.json());


// ROUTE FOR EXPENSES
app.use("api/v1/expense",expenseRoute)


// HEALTH CHECK ENDPOINT    
app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Server is healthy",
        status:"ok"
    })
})

app.use(errorHandler);
export default app;