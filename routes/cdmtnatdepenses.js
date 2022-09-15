const express=require("express")
const router= express.Router()
const cdmtnatdepensesController= require("../controllers/cdmtnatdepenses")

    router.post("/addCdmtNatDepense", cdmtnatdepensesController.addCdmtNatDepense)
    router.put("/disableCdmtNatDepense", cdmtnatdepensesController.disableCdmtNatDepense)
    router.put("/updateCdmtNatDepense", cdmtnatdepensesController.updateCdmtNatDepense)
    router.get("/getOneCdmtNatDepense/:id", cdmtnatdepensesController.getAsingleCdmtNatDepense)
    router.post("/getAllCdmtNatDepense", cdmtnatdepensesController.getAllCdmtNatDepense)
    router.post("/cdmtnatdepenseSelectBy", cdmtnatdepensesController.cdmtnatdepenseSelectBy)

module.exports= router