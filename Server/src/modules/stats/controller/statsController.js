import { getExpenseStatsService } from "../service/statsService.js"

// GET STATS CONTROLLER 
export const getExpenseStats = async(req,res)=>{
    const stats = await getExpenseStatsService();
    res.status(200).json({
        success:true,
        data:stats
    })
}