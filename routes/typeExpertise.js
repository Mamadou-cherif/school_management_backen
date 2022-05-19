const express=require("express")
const router= express.Router()
const typeExpertiseController= require("../controllers/typeExpertise")

    router.get("/selectAllTypeExpertise", typeExpertiseController.selectAllTypeExpertise)
    router.get("/selectByIdTypeExpertise/:id", typeExpertiseController.selectByIdTypeExpertise)
    router.post("/addTypeExpertise", typeExpertiseController.addTypeExpertise)
    router.put("/updateTypeExpertise", typeExpertiseController.updateTypeExpertise)
    router.delete("/deleteTypeExpertise/:id", typeExpertiseController.deleteTypeExpertise)
    module.exports= router