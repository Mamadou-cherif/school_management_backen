const express=require("express")
const router= express.Router()
const flotteController= require("../controllers/flotte")

    router.post("/flotteSelectBy", flotteController.flotteSelectBy)
    router.get("/selectAllFlotte", flotteController.selectAllFlotte)
    router.get("/selectByIdFlotte/:id", flotteController.selectByIdFlotte)
    router.post("/addFlotte", flotteController.addFlotte)
    router.put("/updateFlotte", flotteController.updateFlotte)
    router.delete("/deleteFlotte/:id", flotteController.deleteFlotte)
    
 module.exports= router 