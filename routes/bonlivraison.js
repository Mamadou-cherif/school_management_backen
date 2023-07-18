const express=require("express")
const router= express.Router()
const bonlivraisonController= require("../controllers/bonlivraison")

    router.post("/getPointageToExportByDay", bonlivraisonController.getPointageToExportByDay)
    router.post("/bonlivraisonSelectBy", bonlivraisonController.bonlivraisonSelectBy)
    router.get("/selectAllBonLivraison", bonlivraisonController.selectAllBonLivraison)
    router.get("/getPointageToEexportToExcel", bonlivraisonController.getPointageToEexportToExcel)
    router.get("/selectByIdBonLivraison/:id", bonlivraisonController.selectByIdBonLivraison)
    router.post("/addBonLivraison", bonlivraisonController.addBonLivraison)
    router.put("/updateBonLivraison", bonlivraisonController.updateBonLivraison)
    router.delete("/deleteBonLivraison/:id", bonlivraisonController.deleteBonLivraison)

    module.exports= router 