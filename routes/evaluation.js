const express = require("express")
const router = express.Router()
const evaluationController = require("../controllers/evaluation")

    router.get("/getAllEvaluation", evaluationController.getAllEvaluation)
    router.post("/addEvaluation", evaluationController.addEvaluation)
    router.post("/evaluationSelectBy", evaluationController.selectByEvaluation)
    router.put("/disableEvaluation", evaluationController.disableEvaluation)
    router.put("/updateEvaluation", evaluationController.updateEvaluation)
    router.get("/selectByIdEvaluation/:id", evaluationController.selectByIdEvaluation)

module.exports = router