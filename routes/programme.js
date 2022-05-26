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

module.exports= router