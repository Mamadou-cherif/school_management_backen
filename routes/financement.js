const express=require("express")
const router= express.Router()
const financementController= require("../controllers/financement")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addFinancement", financementController.addFinancement)
    router.put("/disableFinancement", financementController.disableFinancement)
    router.put("/updateFinancement", financementController.updateFinancement)
    router.get("/getOneFinancement/:id", financementController.getAsingleFinancement)
    router.post("/getAllFinancement", financementController.getAllFinancements)
    router.post("/financementSelectBy", financementController.financementSelectBy)

module.exports= router