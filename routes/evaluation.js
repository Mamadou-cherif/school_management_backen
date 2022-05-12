const express = require("express")
const router = express.Router()
const evaluation = require("../controllers/evaluation")


router.get("/getAllEvaluation", evaluation.getAllEvaluation
)


module.exports = router