const express=require("express")
const router= express.Router()
const rubEvaluation= require("../controllers/rubriqueEvaluation")

    router.get("/selectAllRubriqueEvaluation", rubEvaluation.selectAllRubriqueEvaluation)
    router.get("/selectByIdRubriqueEvaluation/:id", rubEvaluation.selectByIdRubriqueEvaluation)
    router.post("/addRubriqueEvaluation", rubEvaluation.addRubriqueEvaluation)
    router.put("/updateRubriqueEvaluation", rubEvaluation.updateRubriqueEvaluation)
    router.delete("/deleteRubriqueEvaluation/:id", rubEvaluation.deleteRubriqueEvaluation)

    module.exports= router
    