const express = require("express")
const router = express.Router()
const paysRubrique = require("../controllers/rubrique")


router.get("/getAllRubrique", paysRubrique.getAllRubrique)
router.get("/getRubriqueById/:id", paysRubrique.getRubriqueById)
router.post("/addRubrique", paysRubrique.addRubrique)
router.put("/updateRubrique", paysRubrique.updateRubrique)
router.delete("/deleteRubrique/:id", paysRubrique.deleteRubrique)

module.exports = router