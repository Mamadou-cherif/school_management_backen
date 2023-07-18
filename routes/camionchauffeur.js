const express=require("express")
const router= express.Router()
const camionchauffeurController= require("../controllers/camionchauffeur")

    router.post("/camionchauffeurSelectBy", camionchauffeurController.camionchauffeurSelectBy)
    router.get("/selectAllCamionChauffeur", camionchauffeurController.selectAllCamionChauffeur)
    router.get("/selectByIdCamionChauffeur/:id", camionchauffeurController.selectByIdCamionChauffeur)
    router.post("/addCamionChauffeur", camionchauffeurController.addCamionChauffeur)
    router.put("/updateCamionChauffeur", camionchauffeurController.updateCamionChauffeur)
    router.delete("/deleteCamionChauffeur/:id", camionchauffeurController.deleteCamionChauffeur)

    module.exports= router 