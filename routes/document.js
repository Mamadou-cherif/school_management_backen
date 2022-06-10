const express=require("express")
const router= express.Router()
const documentController= require("../controllers/document")

    router.post("/addDocument", documentController.addDocument)
    router.post("/documentSelectBy", documentController.documentSelectBy) 
    router.put("/disableDocument", documentController.disableDocument)
    router.put("/updateDocument", documentController.updateDocument)
    router.get("/selectByIdDocument/:id", documentController.selectByIdDocument)

module.exports= router