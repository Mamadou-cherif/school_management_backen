const express=require("express")
const router= express.Router()
const natureController= require("../controllers/nature")

    router.post("/addNature", natureController.addNature)
    router.put("/disableNature", natureController.disableNature)
    router.delete("/deleteNature/:id", natureController.deleteNature)
    router.put("/updateNature", natureController.updateNature)
    router.get("/getOneNature/:id", natureController.getAsingleNature)
    router.post("/getAllNature", natureController.getAllNature)
    router.post("/natureSelectBy", natureController.natureSelectBy)

module.exports= router