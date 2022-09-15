const express=require("express")
const router= express.Router()
const activiteController= require("../controllers/activite")

    router.post("/addActivite", activiteController.addActivite)
    router.put("/disableActivite", activiteController.disableActivite)
    router.put("/updateActivite", activiteController.updateActivite)
    router.get("/getOneActivite/:id", activiteController.getAsingleActivite)
    router.post("/getAllActivite", activiteController.getAllActivite)
    router.post("/activiteSelectBy", activiteController.activiteSelectBy)

module.exports= router