const express=require("express")
const router= express.Router()
const modeAccesController= require("../controllers/modeacces")

    router.post("/addModeAcces", modeAccesController.addModeAcces)
    router.put("/disableModeAcces", modeAccesController.disableModeAcces)
   

module.exports = router