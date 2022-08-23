const express=require("express")
const router= express.Router()
const programmegleController= require("../controllers/programmegrle")

    router.post("/addProgrammegle", programmegleController.addProgrammegles)
    router.put("/disableProgrammegle", programmegleController.disableProgrammegles)
    router.put("/updateProgrammegle", programmegleController.updateProgrammegles)
    router.get("/getProgrammegleById/:id", programmegleController.getAsingleProgrammegles)
    router.get("/getAllProgrammegle", programmegleController.getAllProgrammegles)

module.exports= router