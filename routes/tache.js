const express=require("express")
const router= express.Router()
const tacheController= require("../controllers/tache")

    router.post("/addTache", tacheController.addTache)
    router.put("/disableTache", tacheController.disableTache)
    router.put("/updateTache", tacheController.updateTache)
    router.get("/getOneTache/:id", tacheController.getAsingleTache)
    router.post("/getAllTache", tacheController.getAllTache)
    router.post("/tacheSelectBy", tacheController.tacheSelectBy)

module.exports= router