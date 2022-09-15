const express=require("express")
const router= express.Router()
const cdmtprogrammesController= require("../controllers/cdmtprogrammes")

    router.post("/addCdmtProgramme", cdmtprogrammesController.addCdmtProgramme)
    router.put("/disableCdmtProgramme", cdmtprogrammesController.disableCdmtProgramme)
    router.put("/updateCdmtProgramme", cdmtprogrammesController.updateCdmtProgramme)
    router.get("/getOneCdmtProgramme/:id", cdmtprogrammesController.getAsingleCdmtProgramme)
    router.post("/getAllCdmtProgramme", cdmtprogrammesController.getAllCdmtProgramme)
    router.post("/cdmtprogrammesSelectBy", cdmtprogrammesController.cdmtprogrammeSelectBy)

module.exports= router