const express= require("express")
const router= express.Router()
const budgetPrevisionnelController=require("../controllers/budgetprevisionnel")
router.post("/budgetPrevisionnellectBy", budgetPrevisionnelController.budgetPrevisionnellectBy)

router.post("/addbudgetPrevisionnel", budgetPrevisionnelController.addBudgetPrevisionnel)
router.put("/disableBudgetPrevisionnel", budgetPrevisionnelController.disableBudgetPrevisionnel)
router.put("/updatebudgetPrevisionnel", budgetPrevisionnelController.updateBudgetPrevisionnel)
router.get("/getOnebudgetPrevisionnel/:id", budgetPrevisionnelController.getAsingleBudgetPrevisionnel)


module.exports= router