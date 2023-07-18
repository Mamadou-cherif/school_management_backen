const express=require("express")
const router= express.Router()
const trajetController= require("../controllers/trajet")

    router.post("/getDistanceByContratIdAndChargementId", trajetController.getDistanceByContratIdAndChargementId)
    router.post("/trajetSelectBy", trajetController.trajetSelectBy)
    router.get("/selectAllTrajet", trajetController.selectAllTrajet)
    router.get("/selectByIdTrajet/:id", trajetController.selectByIdTrajet)
    router.post("/addTrajet", trajetController.addTrajet)
    router.put("/updateTrajet", trajetController.updateTrajet)
    router.delete("/deleteTrajet/:id", trajetController.deleteTrajet)

    module.exports= router 