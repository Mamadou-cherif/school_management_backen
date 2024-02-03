const express=require("express")
const router= express.Router()
const statutprojetController= require("../controllers/statutprojet")
const ensure_auth = require("../middlewares/authenticated")

    router.post("/addStatutProjet", statutprojetController.addStatutProjet)
    router.put("/disableStatutProjet", statutprojetController.disableStatutProjet)
    router.delete("/deleteStatutProjet/:id", statutprojetController.deleteStatutProjet)
    router.put("/updateStatutProjet", statutprojetController.updateStatutProjet)
    router.get("/getOneStatutProjet/:id", statutprojetController.getAsingleStatutProjet)
    router.post("/getAllStatutProjet", statutprojetController.getAllStatutProjets)

module.exports= router