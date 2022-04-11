const express=require("express")
const router= express.Router()
const modeAccesController= require("../controllers/modeacces")

    router.post("/addModeAcces", modeAccesController.addModeAcces)
    router.put("/disableModeAcces", modeAccesController.disableModeAcces)
    router.get("/getNonAffectedByMenuAndGroupe", modeAccesController.getNonAffectedByMenuAndGroupe)
    router.get("/getPrincipalAffecteAUnGroupe", modeAccesController.getPrincipalAffecteAUnGroupe)
    router.get("/getAffectesByMenuAndGroupe", modeAccesController.getAffectesByMenuAndGroupe)
    
module.exports = router 