const express=require("express")
const router= express.Router()
const templatetacheController= require("../controllers/templatetache")

    router.post("/addTemplateTache", templatetacheController.addTemplateTache)
    router.post("/selectLastAffecteByActiviteId", templatetacheController.selectLastAffecteByActiviteId)
    router.post("/selectTemplateTacheNotAffectedActivite", templatetacheController.selectTemplateTacheNotAffectedActivite)
    router.post("/selectNextTache", templatetacheController.selectNextTache)
    router.post("/selectFirstTache", templatetacheController.selectFirstTache)
    router.put("/disableTemplateTache", templatetacheController.disableTemplateTache)
    router.put("/updateTemplateTache", templatetacheController.updateTemplateTache)
    router.get("/getOneTemplateTache/:id", templatetacheController.getAsingleTemplateTache)
    router.post("/getAllTemplateTache", templatetacheController.getAllTemplateTache)
    router.post("/templatetacheSelectBy", templatetacheController.templatetacheSelectBy)

module.exports= router