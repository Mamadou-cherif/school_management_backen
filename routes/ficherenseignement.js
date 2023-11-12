const express=require("express")
const router= express.Router()
const ficherenController= require("../controllers/ficherenseignement")

    router.post("/ficherenSelectBy", ficherenController.ficherenSelectBy)
    router.get("/selectAllFicheRen", ficherenController.selectAllFicheRen)
    router.get("/selectFicheRenById/:id", ficherenController.selectFicheRenById)
    router.post("/addFicheRen", ficherenController.addFicheRen)
    router.put("/updateFicheRen", ficherenController.updateFicheRen)
    router.put("/disableFicheRen", ficherenController.disableFicheRen)
    router.delete("/deleteFicheRen/:id", ficherenController.deleteFicheRen)
 module.exports= router 