const express=require("express")
const router= express.Router()
const niveauscolaireController= require("../controllers/niveauscolaire")

    router.post("/addNiveauScolaire", niveauscolaireController.addNiveauScolaire)
    router.put("/disableNiveauScolaire", niveauscolaireController.disableNiveauScolaire)
    router.put("/updateNiveauScolaire", niveauscolaireController.updateNiveauScolaire)
    router.get("/getOneNiveauScolaire/:id", niveauscolaireController.getOneNiveauScolaire)
    router.post("/getAllNiveauScolaire", niveauscolaireController.getAllNiveauScolaire)
    router.post("/niveauscolaireSelectBy", niveauscolaireController.niveauscolaireSelectBy)

module.exports= router