const express=require("express")
const router= express.Router()
const coutexecutionController= require("../controllers/coutexecution")

    router.post("/addCoutExecution", coutexecutionController.addCoutExecution)
    router.put("/disableCoutExecution", coutexecutionController.disableCoutExecution)
    router.delete("/deleteCoutExecution/:id", coutexecutionController.deleteCoutExecution)
    router.put("/updateCoutExecution", coutexecutionController.updateCoutExecution)
    router.get("/getOneCoutExecution/:id", coutexecutionController.getAsingleCoutExecution)
    router.post("/getAllCoutExecution", coutexecutionController.getAllCoutExecution)
    router.post("/coutexecutionSelectBy", coutexecutionController.coutexecutionSelectBy)

module.exports= router