const express = require("express")
const router = express.Router()
const chaineResultat = require("../controllers/chaineResultat")


router.get("/getAllChaine", chaineResultat.getAllChaine)
router.post("/chainederesultatSelectBy", chaineResultat.chainederesultatSelectBy)
router.post("/addChaineResultat", chaineResultat.addChaineResultat)
router.put("/disableChainedeResultat", chaineResultat.disableChaineResultat)
router.put("/updateChainedeResultat", chaineResultat.updateChaineResultat)
router.get("/getOneChainedeResultat/:id", chaineResultat.getAsingleChaineResultat)



module.exports = router