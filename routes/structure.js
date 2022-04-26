const express=require("express")
const router= express.Router()
const structureController= require("../controllers/structure")

// router.get("/prestataireSelectBy", prestataireController.prestataireSelectBy)
router.get("/getAllStructure", structureController.getAllStructure)
module.exports= router