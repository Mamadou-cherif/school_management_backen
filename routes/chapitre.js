const express=require("express")
const router= express.Router()
const chapitreController= require("../controllers/chapitre")

    router.post("/chapitreSelectBy", chapitreController.chapitreSelectBy)
    router.get("/getAllChapitre", chapitreController.getAllChapitre)
    router.post("/addChapitre", chapitreController.addChapitre)
    router.put("/disableChapitre", chapitreController.disableChapitre)
    router.put("/updateChapitre", chapitreController.updateChapitre)
    router.get("/selectByIdChapitre/:id", chapitreController.selectByIdChapitre)
module.exports= router 