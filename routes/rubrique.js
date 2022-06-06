const express = require("express")
const router = express.Router()
const rubriqueController = require("../controllers/rubrique")


router.get("/getAllRubrique", rubriqueController.getAllRubrique)
router.get("/getRubriqueById/:id", rubriqueController.getRubriqueById)
router.post("/addRubrique", rubriqueController.addRubrique)
router.put("/updateRubrique", rubriqueController.updateRubrique)
router.delete("/deleteRubrique/:id", rubriqueController.deleteRubrique)

module.exports = router