const express=require("express")
const router= express.Router()
const beneficiaireController= require("../controllers/beneficiaireactivite")

    router.post("/addBeneficiaireActivite", beneficiaireController.addBeneficiaireActivite)
    router.post("/benefactiviteSelectBy", beneficiaireController.benefactiviteSelectBy)
    router.put("/disableBeneficiaireActivite", beneficiaireController.disableBeneficiaireActivite)
    router.put("/updateBeneficiaireActivite", beneficiaireController.updateBeneficiaireActivite)
    router.get("/getOneBeneficiaireActivite/:id", beneficiaireController.getAsingleBeneficiaireActivite)
    router.post("/getAllBeneficiaireActivite", beneficiaireController.getAllBeneficiaireActivites)

module.exports= router