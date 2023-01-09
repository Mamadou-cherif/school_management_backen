const express=require("express")
const router= express.Router()
const beneficiaireController= require("../controllers/beneficiaire")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addBeneficiaire", beneficiaireController.addBeneficiaire)
    router.put("/disableBeneficiaire", beneficiaireController.disableBeneficiaire)
    router.put("/updateBeneficiaire", beneficiaireController.updateBeneficiaire)
    router.get("/getOneBeneficiaire/:id", beneficiaireController.getAsingleBeneficiaire)
    router.post("/getAllBeneficiaire", beneficiaireController.getAllBeneficiaires)

module.exports= router