const express=require("express")
const router= express.Router()
const templateController= require("../controllers/template")

    router.post("/addTemplate", templateController.addTemplate)
    router.post("/selectTemplateNotAffectedTache", templateController.selectTemplateNotAffectedTache)
    router.put("/disableTemplate", templateController.disableTemplate)
    router.delete("/deleteTemplate/:id", templateController.deleteTemplate)
    router.put("/updateTemplate", templateController.updateTemplate)
    router.get("/getOneTemplate/:id", templateController.getAsingleTemplate)
    router.post("/getAllTemplate", templateController.getAllTemplate)
    router.post("/templateSelectBy", templateController.templateSelectBy)

module.exports= router