const express=require("express")
const router= express.Router()
const payementController= require("../controllers/payement")

    router.post("/payementSelectBy", payementController.payementSelectBy)
    router.post("/getElevePasPaye", payementController.getElevePasPaye)
    router.post("/getStudentSituationByClasseId", payementController.getStudentSituationByClasseId)
    router.get("/selectAllPayement", payementController.selectAllPayement)
    router.get("/selectPayementById/:id", payementController.selectPayementById)
    router.post("/addPayement", payementController.addPayement)
    router.put("/updatePayement", payementController.updatePayement)
    router.delete("/deletePayement/:id", payementController.deletePayement)
 module.exports= router 