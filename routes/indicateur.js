const express=require("express")
const router= express.Router()
const indicateurController= require("../controllers/indicateur")
router.post("/addIndicateur", indicateurController.addIndicateur)
router.put("/disableIndicateur", indicateurController.disableIndicateur)
router.put("/updateIndicateur", indicateurController.updateIndicateur)
router.get("/getOneIndicateur/:id", indicateurController.getAsingleIndicateur)
router.post("/getAllIndicateur", indicateurController.getAllIndicateurs)
    router.post("/indicateurSelectBy", indicateurController.indicateurSelectBy)
  
    module.exports= router 