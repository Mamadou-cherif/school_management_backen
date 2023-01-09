const express=require("express")
const router= express.Router()
const strategieController= require("../controllers/strategie")

    router.post("/addStrategie", strategieController.addStrategie)
    router.put("/disableStrategie", strategieController.disableStrategie)
    router.put("/updateStrategie", strategieController.updateStrategie)
    router.get("/getOneStrategie/:id", strategieController.getAsingleStrategie)
    router.get("/selectStatsPapbStrategie", strategieController.selectStatsPapbStrategie)
    router.get("/strategies_getByParams/:id", strategieController.strategies_getByParams)
    router.post("/getAllStrategie", strategieController.getAllStrategie)
    router.post("/strategieSelectBy", strategieController.strategieSelectBy)

module.exports= router