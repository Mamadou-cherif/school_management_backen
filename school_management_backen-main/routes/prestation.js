const express=require("express")
const router= express.Router()
const prestationController= require("../controllers/prestation")

    router.post("/prestationSelectBy", prestationController.prestationSelectBy)
    router.get("/selectAllPrestation", prestationController.selectAllPrestation)
    router.get("/selectPrestationById/:id", prestationController.selectPrestationById)
    router.post("/addPrestation", prestationController.addPrestation)
    router.put("/disablePrestation", prestationController.disablePrestation)
    router.put("/updatePrestation", prestationController.updatePrestation)
    router.delete("/deletePrestation/:id", prestationController.deletePrestation)
 module.exports= router 