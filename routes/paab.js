const express=require("express")
const router= express.Router()
const paabController= require("../controllers/paab")

    router.post("/addPaab", paabController.addPaab)
    router.put("/disablePaab", paabController.disablePaab)
    router.put("/updatePaab", paabController.updatePaab)
    router.get("/getOnePaab/:id", paabController.getAsinglePaab)
    router.post("/getAllPaab", paabController.getAllPaabs)
    router.post("/paabSelectBy", paabController.paabSelectBy)

module.exports= router