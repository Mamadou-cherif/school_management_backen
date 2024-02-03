const express=require("express")
const router= express.Router()
const deviseController= require("../controllers/devise")

    router.post("/deviseSelectBy", deviseController.deviseSelectBy)
    router.get("/selectAllDevise", deviseController.selectAllDevise)
    router.get("/selectByIdDevise/:id", deviseController.selectByIdDevise)
    router.post("/addDevise", deviseController.addDevise)
    router.put("/updateDevise", deviseController.updateDevise)
    router.delete("/deleteDevise/:id", deviseController.deleteDevise)
    module.exports= router 