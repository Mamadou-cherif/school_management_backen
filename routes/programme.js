const express=require("express")
const router= express.Router()
const programmeController= require("../controllers/programme")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addProgramme", programmeController.addProgramme)
    router.post("/programmeSelectBy", programmeController.programmeSelectBy)
    router.put("/disableProgramme", programmeController.disableProgramme)
    router.put("/updateProgramme", programmeController.updateProgramme)
    router.get("/getOneProgramme/:id", programmeController.getAsingleProgramme)
    router.post("/getAllProgramme", programmeController.getAllProgrammes)
    router.post("/programmeSelectByParams", programmeController.programmeSelectByParams)
    router.get("/countAllProgramme", programmeController.countAllProgramme)

module.exports= router