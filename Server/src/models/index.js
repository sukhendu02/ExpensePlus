import sequelize from "../config/database.js";

import Expense from "./Expense.js";

const syncDatabase = async ()=>{
    await sequelize.sync({alter:true});
    console.log("Database synchronized successfully");
}

export {sequelize, syncDatabase, Expense};