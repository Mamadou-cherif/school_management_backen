const express=require("express")
const router= express.Router()
const coutexecutionController= require("../controllers/coutexecution")

    router.post("/addCoutExecution", coutexecutionController.addCoutExecution)
    router.post("/getLineInCoutExeCutionByQtePrevisionnelle", coutexecutionController.getLineInCoutExeCutionByQtePrevisionnelle)
    router.post("/getLineInCoutExecutionByStrategieIdAndPapbId", coutexecutionController.getLineInCoutExecutionByStrategieIdAndPapbId)
    router.put("/disableCoutExecution", coutexecutionController.disableCoutExecution)
    router.delete("/deleteCoutExecution/:id", coutexecutionController.deleteCoutExecution)
    router.put("/updateCoutExecution", coutexecutionController.updateCoutExecution)
    router.get("/getOneCoutExecution/:id", coutexecutionController.getAsingleCoutExecution)
    router.get("/getAllCoutExecution", coutexecutionController.getAllCoutExecution)
    router.post("/coutexecutionSelectBy", coutexecutionController.coutexecutionSelectBy)

module.exports= router