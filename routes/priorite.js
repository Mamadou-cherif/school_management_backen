const express=require("express")
const router= express.Router()
const prioriteController= require("../controllers/priorite")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addPriorite", prioriteController.addPriorite)
    router.put("/disablePriorite", prioriteController.disablePriorite)
    router.put("/updatePriorite", prioriteController.updatePriorite)
    router.get("/getOnePriorite/:id", prioriteController.getAsinglePriorite)
    router.post("/getAllPriorite", prioriteController.getAllPriorites)

module.exports= router