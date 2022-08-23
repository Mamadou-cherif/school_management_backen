const express=require("express")
const router= express.Router()
const papbController= require("../controllers/papb")

    router.post("/addPapb", papbController.addPapb)
    router.put("/disablePapb", papbController.disablePapb)
    router.put("/updatePapb", papbController.updatePapb)
    router.get("/getOnePapb/:id", papbController.getAsinglePapb)
    router.post("/getAllPapb", papbController.getAllPapbs)
    router.post("/papbSelectBy", papbController.papbsSelectBy)

module.exports= router