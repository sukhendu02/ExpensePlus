import Expense from "../../../models/Expense.js";
import { Op } from "sequelize";
// GET STATS SERVICE
export const getExpenseStatsService = async()=>{
    const now = new Date();
     const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);


//   GET ALL TIME DATA
 const totalAllTime = await Expense.sum("amount");

//  GET THIS MONTH DATA
const totalThisMonth = await Expense.sum("amount",{
    where:{expenseDate: { [Op.between]: [monthStart, monthEnd]
    }
}
});

// GET LAST MONTH DATA 
const getLastMonth = await Expense.sum("amount",{
    where: {  expenseDate: { [Op.between]: [lastMonthStart, lastMonthEnd] } }
})

return{
    totalAllTime:totalAllTime ?? 0,
    totalThisMonth:totalThisMonth ?? 0,
    totalLastMonth:getLastMonth ?? 0,
}
}