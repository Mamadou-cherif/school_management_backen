const express = require("express")
const router = express.Router()
const couleurController = require("../controllers/couleur")


router.get("/getAllCouleur", couleurController.getAllCouleur)
router.get("/getCouleurById/:id", couleurController.getCouleurById)
router.post("/addCouleur", couleurController.addCouleur)
router.put("/updateCouleur", couleurController.updateCouleur)
router.delete("/deleteCouleur/:id", couleurController.deleteCouleur)

module.exports = router