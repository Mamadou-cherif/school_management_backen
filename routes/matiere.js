const express=require("express")
const router= express.Router()
const matiereController= require("../controllers/matiere")

    router.post("/matiereSelectBy", matiereController.matiereSelectBy)
    router.get("/selectAllMatiere", matiereController.selectAllMatiere)
    router.get("/selectMatiereById/:id", matiereController.selectMatiereById)
    router.post("/addMatiere", matiereController.addMatiere)
        router.put("/updateMatiere", matiereController.updateMatiere)
    router.delete("/deleteMatiere/:id", matiereController.deleteMatiere)
 module.exports= router 