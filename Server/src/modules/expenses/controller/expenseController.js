import {addExpenseService, deleteExpenseService, updateExpeseService,getAllExpensesService} from "../service/expenseService.js";

// ADD CONTORLLER
export const addExpense = async(req,res)=>{
    const userData = req.body; 
    const response = await addExpenseService(userData);
        res.status(201).json({
            success:true,
            message:"Expense added successfully",
            data:response
        })
}


// GET CONTROLLER WITH QUERY
export const getAllExpense = async(req,res)=>{
   const response = await getAllExpensesService(req.query);
   res.status(200).json({
    success:true,
    data:response
   }) 
}

// DELETE CONTROLLER
export const deleteExpense = async(req,res)=>{
    const expenseId = req.params.id;
    const response = await deleteExpenseService(expenseId);
    res.status(204).send();
}

// UPDATE CONTROLLER
export const updateExpense = async(req,res)=>{
    const expenseId = req.params.id;
    const updatedData = req.body;
    const response = await updateExpeseService(expenseId,updatedData);

    res.status(200).json({
        success:true,
        message:"Expesnse updated successfully",
        data:response
    })

}