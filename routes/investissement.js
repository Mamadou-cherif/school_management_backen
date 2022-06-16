const express = require("express")
const router = express.Router()
const investissementController = require("../controllers/investissement")

router.post("/investissementSelectBy", investissementController.investissementSelectBy)
router.post("/addInvestissement", investissementController.addInvestissement)
router.put("/disableInvestissement", investissementController.disableInvestissement)
router.put("/updateInvestissement", investissementController.updateInvestissement)
router.post("/addInvestissement", investissementController.addInvestissement)
router.get("/getOneInvestissement/:id", investissementController.getAsingleInvestissement)
router.get("/getAllInvestissement", investissementController.getAllInvestissement)

module.exports = router 
