import {Router} from "express";
const router = Router();
import {addExpense,getAllExpense,deleteExpense,updateExpense} from "../controller/expenseController.js";

// ROUTES
router.post("/",addExpense);

router.get("/",getAllExpense);

router.delete('/:id',deleteExpense);

router.patch('/:id',updateExpense)


export default router;