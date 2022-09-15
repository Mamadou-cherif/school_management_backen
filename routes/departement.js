const express = require("express")
const router = express.Router()
const departementController = require("../controllers/departement")

// router.get("/prestataireSelectBy", departementController.prestataireSelectBy)
router.get("/getAllDepartement", departementController.getAllDepartement)
router.post("/addDepartement", departementController.addDepartement)
router.put("/updateDepartement", departementController.updateDepartement)
router.put("/disableDepartement", departementController.disableDepartement)
router.get("/getOneDepartement/:id", departementController.getAsingleDepartement)
router.get("/countAllDepartement", departementController.countAllDepartement)

module.exports = router