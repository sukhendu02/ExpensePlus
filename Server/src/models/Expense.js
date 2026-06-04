
import {DataTypes,Model} from "sequelize";
import sequelize from "../config/database.js";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Other",
];

export const PAYMENT_METHODS = Object.freeze([
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Other",
]);


const Expense = sequelize.define("Expense",
    {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        amount:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                isDecimal:true,
                min:{args:[0.01],"msg":"Amount must be greater than 0"}
            },
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
              validate: {
        isIn: {
          args: [CATEGORIES],
          msg: `Category must be one of: ${CATEGORIES.join(", ")}`,
        },
      },

        },
        expenseDate: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
      validate: {
        isDate: true,
        notFuture(value) {
          if (new Date(value) > new Date()) {
            throw new Error("Date cannot be in the future");
          }
        },
      },
    },

       description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
     paymentMethod: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "Cash",
      field: "payment_method",
      validate: {
        isIn: [PAYMENT_METHODS],
      },
    },
        
    },
    {
        tableName:"expenses",

        indexes:[
            {
                fields:["category"]
            },
            {
                fields:["expense_date"]
            },

        ]
    }
)

export default Expense;