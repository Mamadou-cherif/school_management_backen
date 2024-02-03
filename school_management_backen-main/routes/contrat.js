const express=require("express")
const router= express.Router()
const contratController= require("../controllers/contrat")

    router.post("/contratSelectBy", contratController.contratSelectBy)
    router.get("/selectAllContrat", contratController.selectAllContrat)
    router.get("/selectByIdContrat/:id", contratController.selectByIdContrat)
    router.post("/addContrat", contratController.addContrat)
    router.put("/updateContrat", contratController.updateContrat)
    router.delete("/deleteContrat/:id", contratController.deleteContrat)

module.exports= router 