import {Sequelize} from "sequelize";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname=path.dirname(fileURLToPath(import.meta.url));

const DB_PATH = process.env.NODE_ENV==="test" ? ":memory:" :path.join(__dirname,"../../data/expenses.sqlite");

const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:DB_PATH,
    logging:process.env.NODE_ENV==="development"? console.log : false,

    define:{
        underscored:true,
        timestamps:true,
    }
})

export default sequelize;
