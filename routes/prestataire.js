const express = require("express")
const router = express.Router()
const prestataireController = require("../controllers/prestataire")

router.get("/prestataireSelectBy", prestataireController.prestataireSelectBy)
router.get("/getOnePrestataire/:id", prestataireController.getAsinglePrestataire)
router.get("/getAllPrestataire", prestataireController.getAllPrestataire)
router.post("/addPrestataire", prestataireController.addPrestataire)
router.put("/updatePrestataire", prestataireController.updatePrestataire)
router.put("/disablePrestataire", prestataireController.disablePrestataire)


module.exports = router