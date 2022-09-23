const express=require("express")
const router= express.Router()
const activitetacheController= require("../controllers/activitetache")

    router.post("/addActiviteTache", activitetacheController.addActiviteTache)
    router.put("/disableActiviteTache", activitetacheController.disableActiviteTache)
    router.put("/updateActiviteTache", activitetacheController.updateActiviteTache)
    router.get("/getOneActiviteTache/:id", activitetacheController.getAsingleActiviteTache)
    router.post("/getAllActiviteTache", activitetacheController.getAllActiviteTache)
    router.post("/activitetacheSelectBy", activitetacheController.activitetacheSelectBy)

module.exports= router