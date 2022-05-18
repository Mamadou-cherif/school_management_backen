const express=require("express")
const router= express.Router()
const uniteController= require("../controllers/unite")

    router.post("/uniteSelectBy", uniteController.uniteSelectBy)
    router.get("/selectAllUnite", uniteController.selectAllUnite)
    router.get("/selectByIdUnite/:id", uniteController.selectByIdUnite)
    router.post("/addUnite", uniteController.addUnite)
    router.put("/updateUnite", uniteController.updateUnite)
    router.delete("/deleteUnite/:id", uniteController.deleteUnite)
    module.exports= router 