import {Router} from "express";
const router = Router();


// ROUTES
router.post("/add-expense",(req,res)=>{


    res.status(201).json({
        message:"Expense added successfully",
        data:data
    })

})

export default router;