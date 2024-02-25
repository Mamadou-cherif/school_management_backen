const express=require("express")
const router= express.Router()
const eleveController= require("../controllers/eleve")

    router.post("/getEleveByMatriculeAndEcoleId", eleveController.getEleveByMatriculeAndEcoleId)
    router.post("/makeClassement", eleveController.makeClassement)
    router.post("/makeSecondaryClassement", eleveController.makeSecondaryClassement)
    router.get("/selectAllEleve", eleveController.selectAllEleve)
    router.post("/eleveSelectBy", eleveController.eleveSelectBy)
    router.get("/selectEleveById/:id", eleveController.selectEleveById)
    router.post("/addEleve", eleveController.addEleve)
    router.put("/updateEleve", eleveController.updateEleve)
    router.put("/disableEleve", eleveController.disableEleve)
    router.delete("/deleteEleve/:id", eleveController.deleteEleve)
    
 module.exports= router 