const express=require("express")
const router= express.Router()
const enseignantclasseController= require("../controllers/enseignantclasse")

    router.post("/getEnseignantByClasseId", enseignantclasseController.getEnseignantByClasseId)
    router.post("/enseignantclasseSelectBy", enseignantclasseController.enseignantclasseSelectBy)
    router.get("/selectAllEnseignantClasse", enseignantclasseController.selectAllEnseignantClasse)
    router.get("/selectEnseignantClasseById/:id", enseignantclasseController.selectEnseignantClasseById)
    router.post("/addEnseignantClasse", enseignantclasseController.addEnseignantClasse)
    router.put("/updateEnseignantClasse", enseignantclasseController.updateEnseignantClasse)
    router.delete("/deleteEnseignantClasse/:id", enseignantclasseController.deleteEnseignantClasse)
 module.exports= router 