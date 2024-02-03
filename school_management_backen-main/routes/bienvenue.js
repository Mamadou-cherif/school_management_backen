const express= require("express")
const router= express.Router()
const bienvenueController=require("../controllers/bienvenue")
router.get("/", bienvenueController.bienvenue)

module.exports= router