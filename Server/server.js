import app from './app.js';
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {syncDatabase} from "./src/models/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 

const PORT = process.env.PORT || 5000;


const dataDir = path.join(__dirname,"/Server/data");
if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir,{recursive:true});
}

// STARTING THE SERVER
const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    await syncDatabase();
};

startServer();