const express=require("express")
const router= express.Router()
const plannifactiviteController= require("../controllers/planifactivite")

    router.post("/addSinglePlannifActivite", plannifactiviteController.addSinglePlannifActivite)
    router.post("/selectTacheNotAffectedPlannifActivite", plannifactiviteController.selectTacheNotAffectedPlannifActivite)
    router.post("/deleteAndUpdate", plannifactiviteController.deleteAndUpdate)
    router.post("/plannifactiviteSelectBy", plannifactiviteController.plannifactiviteSelectBy)
    router.get("/getAllPlannifActivite", plannifactiviteController.getAllPlannifActivite)
    router.post("/addPlannifActivite", plannifactiviteController.addPlannifActivite)
    router.put("/disablePlannifActivite", plannifactiviteController.disablePlannifActivite)
    router.delete("/deletePlanifActivite/:id", plannifactiviteController.deletePlanifActivite)
    router.put("/updatePlannifActivite", plannifactiviteController.updatePlannifActivite)
    router.get("/selectByIdPlannifActivite/:id", plannifactiviteController.selectByIdPlannifActivite)

module.exports= router 