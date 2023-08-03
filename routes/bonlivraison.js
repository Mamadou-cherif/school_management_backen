const express=require("express")
const router= express.Router()
const bonlivraisonController= require("../controllers/bonlivraison")

    router.post("/documents", bonlivraisonController.files)
    router.get("/getfile/:File", bonlivraisonController.getImageFile)
    router.post("/getPointageToExportByDay", bonlivraisonController.getPointageToExportByDay)
    router.post("/situationCamionParMois", bonlivraisonController.situationCamionParMois)
    router.post("/getTonnageByChauffeurAndMonth", bonlivraisonController.getTonnageByChauffeurAndMonth)
    router.post("/getBonLivraisonsByMonthAndYears", bonlivraisonController.getBonLivraisonsByMonthAndYears)
    router.post("/bonlivraisonSelectBy", bonlivraisonController.bonlivraisonSelectBy)
    router.get("/selectAllBonLivraison", bonlivraisonController.selectAllBonLivraison)
    router.get("/getPointageToEexportToExcel", bonlivraisonController.getPointageToEexportToExcel)
    router.get("/selectByIdBonLivraison/:id", bonlivraisonController.selectByIdBonLivraison)
    router.post("/addBonLivraison", bonlivraisonController.addBonLivraison)
    router.put("/updateBonLivraison", bonlivraisonController.updateBonLivraison)
    router.delete("/deleteBonLivraison/:id", bonlivraisonController.deleteBonLivraison)

    module.exports= router 