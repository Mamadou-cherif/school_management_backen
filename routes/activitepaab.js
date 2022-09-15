const express=require("express")
const router= express.Router()
const activitepaabController= require("../controllers/activitepaab")

    router.post("/addActivitePaab", activitepaabController.addActivitePaab)
    router.post("/activite_getParams", activitepaabController.activite_getParams)
    router.put("/disableActivitePaab", activitepaabController.disableActivitePaab)
    router.put("/updateActivitePaab", activitepaabController.updateActivitePaab)
    router.get("/getOneActivitePaab/:id", activitepaabController.getAsingleActivitePaab)
    router.post("/getAllActivitePaab", activitepaabController.getAllActivitePaab)
    router.post("/activitepaabsSelectBy", activitepaabController.activitepaabSelectBy)

module.exports= router