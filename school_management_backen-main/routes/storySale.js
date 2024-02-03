const express=require("express")
const router= express.Router()
const storysaleController= require("../controllers/storySale")

    router.post("/storysaleSelectBy", storysaleController.storysaleSelectBy)
    router.get("/selectAllstorySale", storysaleController.selectAllstorySale)
    router.get("/selectstorySaleById/:id", storysaleController.selectstorySaleById)
    router.post("/addstorySale", storysaleController.addstorySale)
    router.put("/updatestorySale", storysaleController.updatestorySale)
    router.delete("/deletestorySale/:id", storysaleController.deletestorySale)

 module.exports= router 