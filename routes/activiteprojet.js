const express=require("express")
const router= express.Router()
const activiteprojetController= require("../controllers/activiteprojet")

    router.post("/addActiviteProjet", activiteprojetController.addActiviteProjet)
    router.put("/disableActiviteProjet", activiteprojetController.disableActiviteProjet)
    router.put("/updateActiviteProjet", activiteprojetController.updateActiviteProjet)
    router.get("/getOneActiviteProjet/:id", activiteprojetController.getAsingleActiviteProjet)
    router.post("/getAllActiviteProjet", activiteprojetController.getAllActiviteProjet)
    router.post("/activiteprojetSelectBy", activiteprojetController.activiteprojetSelectBy)

module.exports= router