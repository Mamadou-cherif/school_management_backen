const express=require("express")
const router= express.Router()
const contratflotteController= require("../controllers/contratflotte")

    router.post("/contratflotteSelectBy", contratflotteController.contratflotteSelectBy)
    router.get("/selectAllContratFlotte", contratflotteController.selectAllContratFlotte)
    router.get("/selectByIdContratFlotte/:id", contratflotteController.selectByIdContratFlotte)
    router.post("/addContratFlotte", contratflotteController.addContratFlotte)
    router.put("/updateContratFlotte", contratflotteController.updateContratFlotte)
    router.delete("/deleteContratFlotte/:id", contratflotteController.deleteContratFlotte)

    module.exports= router 