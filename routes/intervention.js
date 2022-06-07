const express=require("express")
const router= express.Router()
const interventionController= require("../controllers/intervention")

    router.post("/addIntervention", interventionController.addIntervention)
    router.put("/disableIntervention", interventionController.disableIntervention)
    router.put("/updateIntervention", interventionController.updateIntervention)
    router.get("/getOneIntervention/:id", interventionController.getAsingleIntervention)
    router.post("/interventionSelectBy", interventionController.interventionSelectBy)
  
    module.exports= router 