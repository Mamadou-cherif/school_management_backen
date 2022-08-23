const express=require("express")
const router= express.Router()
const sousprogrammeController= require("../controllers/sousprogramme")

    router.post("/addSousProgramme", sousprogrammeController.addSousProgramme)
    router.put("/disableSousProgramme", sousprogrammeController.disableSousProgramme)
    router.put("/updateSousProgramme", sousprogrammeController.updateSousProgramme)
    router.get("/getOneSousProgramme/:id", sousprogrammeController.getAsingleSousProgramme)
    router.post("/getAllSousProgramme", sousprogrammeController.getAllSousProgramme)
    router.post("/sousprogrammeSelectBy", sousprogrammeController.sousprogrammeSelectBy)

module.exports= router