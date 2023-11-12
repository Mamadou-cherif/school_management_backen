const express=require("express")
const router= express.Router()
const trancheController= require("../controllers/tranche")

    router.post("/trancheSelectBy", trancheController.trancheSelectBy)
    router.get("/selectAllTranche", trancheController.selectAllTranche)
    router.get("/selectTrancheById/:id", trancheController.selectTrancheById)
    router.post("/addTranche", trancheController.addTranche)
    router.put("/updateTranche", trancheController.updateTranche)
    router.delete("/deleteTranche/:id", trancheController.deleteTranche)
 module.exports= router 