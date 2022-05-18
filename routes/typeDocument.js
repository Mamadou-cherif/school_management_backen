const express=require("express")
const router= express.Router()
const typeDocumentController= require("../controllers/typeDocument")

    router.get("/selectAllTypeDocument", typeDocumentController.selectAllTypeDocument)
    router.get("/selectByIdTypeDocument/:id", typeDocumentController.selectByIdTypeDocument)
    router.post("/addTypeDocument", typeDocumentController.addTypeDocument)
    router.put("/updateTypeDocument", typeDocumentController.updateTypeDocument)
    router.delete("/deleteTypeDocument/:id", typeDocumentController.deleteTypeDocument)
    module.exports= router