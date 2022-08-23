const express=require("express")
const router= express.Router()
const programmesprioritaireController= require("../controllers/programmeprioritaire")

    router.post("/documentPgprioritaires", programmesprioritaireController.files)
    router.get("/getfile/:File", programmesprioritaireController.getImageFile)
    router.post("/addPgprioritaire", programmesprioritaireController.addPgprioritaire)
    router.put("/disablePgprioritaire", programmesprioritaireController.disablePgprioritaire)
    router.put("/updatePgprioritaire", programmesprioritaireController.updatePgprioritaire)
    router.get("/getOnePgprioritaire/:id", programmesprioritaireController.getAsinglePgprioritaire)
    router.post("/getAllPgprioritaire", programmesprioritaireController.getAllPgprioritaires)
    router.post("/programmesprioritaireSelectBy", programmesprioritaireController.programmesprioritairesSelectBy)

module.exports= router