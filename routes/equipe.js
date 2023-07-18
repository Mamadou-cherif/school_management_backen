const express=require("express")
const router= express.Router()
const equipeController= require("../controllers/equipe")

    router.post("/equipeSelectBy", equipeController.equipeSelectBy)
    router.get("/selectAllEquipe", equipeController.selectAllEquipe)
    router.get("/selectByIdEquipe/:id", equipeController.selectByIdEquipe)
    router.get("/getSupperviseurNotAffectedToEquipe/:id", equipeController.getSupperviseurNotAffectedToEquipe)
    router.post("/addEquipe", equipeController.addEquipe)
    router.put("/updateEquipe", equipeController.updateEquipe)
    router.delete("/deleteEquipe/:id", equipeController.deleteEquipe)
    
 module.exports= router 