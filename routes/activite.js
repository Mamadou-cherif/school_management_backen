const express=require("express")
const router= express.Router()
const activiteController= require("../controllers/activite")

    router.post("/addActivite", activiteController.addActivite)
    router.post("/selectNotAffectedByPapbIdAndStrategieId", activiteController.selectNotAffectedByPapbIdAndStrategieId)
    router.put("/disableActivite", activiteController.disableActivite)
    router.put("/updateActivite", activiteController.updateActivite)
    router.get("/getOneActivite/:id", activiteController.getAsingleActivite)
    router.get("/selectStatsPapbActivite", activiteController.selectStatsPapbActivite)
    router.get("/getActiviteByResultatId/:id", activiteController.getActiviteByResultatId)
    router.post("/getAllActivite", activiteController.getAllActivite)
    router.post("/activiteSelectBy", activiteController.activiteSelectBy)
    router.post("/selectNotAffectedPaabId", activiteController.selectNotAffectedPaabId)

module.exports= router