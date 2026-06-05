import { BadRequestError, NotFoundError } from "../../../middleware/ErrorHandler.js"

import { CATEGORIES } from "../../../constant/categories.js";
import { PAYMENT_METHODS } from "../../../constant/paymentMethod.js";
import { SORTABLE_FIELDS,SORT_ORDERS,DEFAULT_PAGE,DEFAULT_LIMIT,MAX_LIMIT } from "../../../constant/expenseConstants.js";
import Expense from "../../../models/Expense.js";
import { Op } from "sequelize";


// VALIDATION SHARED BY ADD AND UPDATE
const validateExpenseInput = (data)=>{

    // AMOUNT
    if (data.amount !== undefined) {
        const amount = Number(data.amount);
        if (isNaN(amount) || amount <= 0) {
            throw  BadRequestError("Amount must be a positive number");
        }
    }

    // CATEGORY
    if (data.category !== undefined) {
        const categoryCheck=data.category.trim();
        if (!CATEGORIES.includes(categoryCheck)) {
            throw  BadRequestError("Invalid Category");
        }
        data.category=categoryCheck;
    }

    // PAYMENT METHOD 
    if (data.paymentMethod !== undefined && data.paymentMethod !== null) {
        const Method = data.paymentMethod.trim();
        if (Method && !PAYMENT_METHODS.includes(Method)) {
            throw  BadRequestError("Invalid Payment Method");
        }
        data.paymentMethod = Method;
    }

    // EXPENSE DATE
    if (data.expenseDate !== undefined) {
        const expenseDate = new Date(data.expenseDate);
        if (isNaN(expenseDate.getTime())) {
            throw  BadRequestError("Date must be a valid date");
        }
        if (expenseDate > new Date()) {
            throw  BadRequestError("Expense date cannot be in the future");
        }
    }

    // DESCRIPTION 
    if (data.description !== undefined && data.description !== null) {
        const trimmedDesc = data.description.trim();
        if (trimmedDesc.length > 250) {
            throw  BadRequestError("Description cannot exceed 250 characters");
        }
        data.description = trimmedDesc;
    }

}


// ADD EXPENSE SERVICE
export const addExpenseService = async(userData)=>{
  
     if(!userData){
        throw BadRequestError("Please fill all the required details");
    }
    if(!userData.amount|| !userData.category || !userData.expenseDate ){
        throw BadRequestError("Please fill all the required details");
    }
    // VALIDATE INPUTS
   validateExpenseInput(userData)

   const {amount,description,category,paymentMethod,expenseDate} = userData;
       
    // SAVE THE DATA 
    const expense = await Expense.create({
      amount,
      description,
      category,
      paymentMethod,
      expenseDate
    })
    return expense;
}

// DELETE EXPENSE SERVICE
export const deleteExpenseService = async(expenseId)=>{

    // FIND EXPENSE USING EXPENSE ID
    const expense = await Expense.findOne({
        where:{id:expenseId}
    })
    if(!expense) throw NotFoundError("Expense");

    await expense.destroy();
}

// UPDATE EXPENSE SERVICE
export const updateExpeseService=async(expenseId,updatedData)=>{
    // FIND THE ITEM BY ID
    const expense = await Expense.findOne({
        where:{id:expenseId}
    })
    if(!expense) throw NotFoundError("Expense");

    // VALIDATE THE INPUTS
    validateExpenseInput(updatedData)

    // UPDATE THE DATA 
    const updateExpense=await expense.update(updatedData)

    return updateExpense
}

// GET EXPENSE SERVICE
export const getAllExpensesService = async(query={})=>{

    // PREDEFINED CONSTANTS
    const {
        page=DEFAULT_PAGE,
        limit=DEFAULT_LIMIT,
        sortBy = "expenseDate",
        order = "DESC",
        category,
        search,
        paymethod,
        startDate,
        endDate,
    } = query;

    // CONVERT TO INT
    const parsedPage = parseInt(page,10);
    const parsedLimit= parseInt(limit,10);

    // VALIDATE PAGE & LIMIT
    if(isNaN(parsedPage) || parsedPage<1) throw BadRequestError("Page must be a positive integer");
    if(isNaN(parsedLimit) || parsedLimit<1) throw BadRequestError("Limit must be above 1");

    // VALIDATE SORTING
    if(!SORTABLE_FIELDS.includes(sortBy)) throw BadRequestError("Invalid sortable fields");
    if(!SORT_ORDERS.includes(order.toUpperCase())) throw BadRequestError("Order must be ASC or DESC");

    // VALIDATE DATE RANGE
     if (startDate && isNaN(new Date(startDate).getTime())) throw BadRequestError("Start date must be a valid date (YYYY-MM-DD)");
    if (endDate && isNaN(new Date(endDate).getTime())) throw BadRequestError("endDate must be a valid date (YYYY-MM-DD)");
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) throw BadRequestError("Start date cannot be after endDate");

    // BUILD WHERE CLAUSE
    const where={};

    //CATEGORY FILTER 
    if(category && category!=="All"){
        where.category=category;
    }

    //PAYMENT METHOD FILTER 
    if(paymethod && paymethod!=="All"){
        where.paymentMethod=paymethod;
    }

    // DATE RANGE FILTER
    if(startDate || endDate){
        where.expenseDate={};
        if(startDate) where.expenseDate[Op.gte] = startDate;
        if(endDate) where.expenseDate[Op.lte]=endDate;
    }

    // APPLY SEARCH FOR DESCRIPTION/CATEGORY/PAYMENETMETOHD
    if (search?.trim()) {
    where[Op.or] = [
        { description: { [Op.like]: `%${search.trim()}%` } },
        { category: { [Op.like]: `%${search.trim()}%` } },
        { paymentMethod: { [Op.like]: `%${search.trim()}%` } },
    ];
    }

    // FIND ALL THE DATA FROM DB USING WHERE
    const offset = (parsedPage-1)*parsedLimit;
    const {count,rows} = await Expense.findAndCountAll({
        where,
        order:[[sortBy,order.toUpperCase()]],
        limit:parsedLimit,
        offset,
    });

    return{
    data:rows,
    total:count,
    pagination:{
        page:parsedPage,
        limit:parsedLimit,
        totalPage : Math.ceil(count/parsedLimit),
        hasNext:parsedPage<Math.ceil(count/parsedLimit),
        hasPrev : parsedPage>1,
    },
    };
    
};