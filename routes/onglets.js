const express = require("express")
const router = express.Router()
const ongletController = require("../controllers/onglets")

router.post("/addOnglet", ongletController.addOnglet)
router.put("/disableOnglet", ongletController.disableOnglet)
//ramene tous les onglets qu'un groupe ne possède pas en "tout" onglet_
router.post("/getOngletByGroupe", ongletController.getOngletByGroupe)
router.post("/getOngletByUserReference", ongletController.getOngletByUserReference)
router.get("/getOngletById/:id", ongletController.getOngletById)
router.put("/updateOnglet/:id", ongletController.updateOnglet)
router.post("/checkIfOngletExists", ongletController.checkIfOngletExists)
// renvoie tous les onglets qui sont affecté à un groupe donné
router.post("/getAffectesByGroupeAndMenu", ongletController.getAffectesByGroupeAndMenu)
// renvoie tous les onglets affectés à un groupe donné
router.post("/getOngletsAffecteAUnGroupe", ongletController.getOngletsAffecteAUnGroupe)

module.exports = router