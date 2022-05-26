const express = require("express")
const router = express.Router()
const chaineResultat = require("../controllers/chaineResultat")


router.get("/getAllChaine", chaineResultat.getAllChaine)
router.post("/chainederesultatSelectBy", chaineResultat.chainederesultatSelectBy)


module.exports = router