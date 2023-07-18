const express=require("express")
const router= express.Router()
const camionsiteController= require("../controllers/camionsite")

    router.post("/camionsiteSelectBy", camionsiteController.camionsiteSelectBy)
    router.get("/selectAllCamionSite", camionsiteController.selectAllCamionSite)
    router.get("/selectByIdCamionSite/:id", camionsiteController.selectByIdCamionSite)
    router.post("/addCamionSite", camionsiteController.addCamionSite)
    router.put("/updateCamionSite", camionsiteController.updateCamionSite)
    router.delete("/deleteCamionSite/:id", camionsiteController.deleteCamionSite)

    module.exports= router 