const express=require("express")
const router= express.Router()
const personnelController= require("../controllers/personnel")

    router.post("/getChauffeurNotAffectedToCamionToASite", personnelController.getChauffeurNotAffectedToCamionToASite)
    router.post("/getChauffeurNotAffectedToCamionToAFlotte", personnelController.getChauffeurNotAffectedToCamionToAFlotte)
    router.post("/getChauffeurByFlotteId", personnelController.getChauffeurByFlotteId)
    router.post("/personnelSelectBy", personnelController.personnelSelectBy)
    router.get("/selectAllPersonnel", personnelController.selectAllPersonnel)
    router.get("/selectByIdPersonnel/:id", personnelController.selectByIdPersonnel)
    router.post("/addPersonnel", personnelController.addPersonnel)
    router.put("/updatePersonnel", personnelController.updatePersonnel)
    router.delete("/deletePersonnel/:id", personnelController.deletePersonnel)
module.exports= router 