const express=require("express")
const router= express.Router()
const sessionController= require("../controllers/session")

    router.get("/selectAllSession", sessionController.selectAllSession)
   
 module.exports= router 