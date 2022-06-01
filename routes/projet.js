const express = require("express")

const router = express.Router()
const projetController = require("../controllers/projet")
const ensure_auth = require("../middlewares/authenticated")

router.post("/addProjet", projetController.addProjet)
router.post("/projetSelectBy", projetController.projetSelectBy)
router.put("/disableProjet", projetController.disableProjet)
router.put("/updateProjet", projetController.updateProjet)
router.get("/getOneProjet/:id", projetController.getAsingleProjet)
router.post("/getAllProjet", projetController.getAllProjets)
router.post("/getStatutByProgrammeIdOrAxeId", projetController.getStatutByProgrammeIdOrAxeId)

module.exports = router