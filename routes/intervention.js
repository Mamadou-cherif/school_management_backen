const express=require("express")
const router= express.Router()
const interventionController= require("../controllers/intervention")

    router.post("/addIntervention", interventionController.addIntervention)
    router.put("/disableIntervention", interventionController.disableIntervention)
    router.put("/updateIntervention", interventionController.updateIntervention)
    router.get("/getOneIntervention/:id", interventionController.getAsingleIntervention)
    router.get("/countAllIntervention", interventionController.countAllIntervention)
    router.post("/interventionSelectBy", interventionController.interventionSelectBy)
    router.post("/interventionSelectByParams", interventionController.interventionSelectByParams)
  
    module.exports= router 