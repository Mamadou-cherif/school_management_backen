const express=require("express")
const router= express.Router()
const executionController= require("../controllers/execution")

    router.post("/executionSelectBy", executionController.executionSelectBy)
    router.get("/getAllExecution", executionController.getAllExecution)
    router.post("/addExecution", executionController.addExecution)
    router.put("/disableExecution", executionController.disableExecution)
    router.put("/updateExecution", executionController.updateExecution)
    router.get("/getOneExecution/:id", executionController.selectByIdExecution)
    module.exports= router 