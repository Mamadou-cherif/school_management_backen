const express=require("express")
const router= express.Router()
const defisprogrammeprioritaireController= require("../controllers/defisprgpriroritaire")

    router.post("/addDefisprogrammePrioritaire", defisprogrammeprioritaireController.addDefisprogrammePrioritaire)
    router.put("/disableDefisprogrammePrioritaire", defisprogrammeprioritaireController.disableDefisprogrammePrioritaire)
    router.put("/updateDefisprogrammePrioritaire", defisprogrammeprioritaireController.updateDefisprogrammePrioritaire)
    router.get("/getOneDefisprogrammePrioritaire/:id", defisprogrammeprioritaireController.getAsingleDefisprogrammePrioritaire)
    router.post("/getAllDefisprogrammePrioritaire", defisprogrammeprioritaireController.getAllDefisprogrammePrioritaire)
    router.post("/defisprogrammeprioritaireSelectBy", defisprogrammeprioritaireController.defisprogrammeprioritaireSelectBy)

module.exports= router