const express=require("express")
const router= express.Router()
const camionController= require("../controllers/camion")

    router.post("/camionSelectBy", camionController.camionSelectBy)
    router.get("/selectAllCamion", camionController.selectAllCamion)
    router.get("/selectByIdCamion/:id", camionController.selectByIdCamion)
    router.post("/addCamion", camionController.addCamion)
    router.put("/updateCamion", camionController.updateCamion)
    router.delete("/deleteCamion/:id", camionController.deleteCamion)
module.exports= router 