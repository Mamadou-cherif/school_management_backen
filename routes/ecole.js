const express=require("express")
const router= express.Router()
const ecoleController= require("../controllers/ecole")

    router.post("/ecoleSelectBy", ecoleController.ecoleSelectBy)
    router.get("/selectAllEcole", ecoleController.selectAllEcole)
    router.get("/selectEcoleById/:id", ecoleController.selectEcoleById)
    router.post("/addEcole", ecoleController.addEcole)
    router.put("/updateEcole", ecoleController.updateEcole)
    router.delete("/deleteEcole/:id", ecoleController.deleteEcole)
 module.exports= router 