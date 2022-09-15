const express=require("express")
const router= express.Router()
const resultatController= require("../controllers/resultat")

    router.post("/addResultat", resultatController.addResultat)
    router.put("/disableResultat", resultatController.disableResultat)
    router.put("/updateResultat", resultatController.updateResultat)
    router.get("/getOneResultat/:id", resultatController.getAsingleResultat)
    router.post("/getAllResultat", resultatController.getAllResultat)
    router.post("/resultatSelectBy", resultatController.resultatSelectBy)

module.exports= router