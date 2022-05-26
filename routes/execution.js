const express=require("express")
const router= express.Router()
const executionController= require("../controllers/execution")

    router.post("/executionSelectBy", executionController.executionSelectBy)
  
    module.exports= router 