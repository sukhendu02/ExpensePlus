import {Router} from "express";
const router = Router();
import {getExpenseStats} from "../controller/statsController.js"
// ROUTES 
router.get("/",  getExpenseStats);

export default router;