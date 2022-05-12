const express=require("express")
const router= express.Router()
const communeController= require("../controllers/commune")

    router.post("/communeSelectBy", communeController.communeSelectBy)
    router.post("/selectAllCommune", communeController.selectAllCommune)
    router.get("/selectByIdCommune/:id", communeController.selectByIdCommune)
    router.post("/addCommune", communeController.addCommune)
    router.put("/updateCommune", communeController.updateCommune)
    router.delete("/deleteCommune/:id", communeController.deleteCommune)
    module.exports= router