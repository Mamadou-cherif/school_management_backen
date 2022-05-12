const express=require("express")
const router= express.Router()
const regionController= require("../controllers/regions")

    router.post("/regionSelectBy", regionController.regionSelectBy)
    router.get("/selectAllRegion", regionController.selectAllRegion)
    router.get("/selectByIdRegion/:id", regionController.selectByIdRegion)
    router.post("/addRegions", regionController.addRegion)
    router.put("/updateRegions", regionController.updateRegion)
    router.delete("/deleteRegion/:id", regionController.deleteRegion)
    module.exports= router