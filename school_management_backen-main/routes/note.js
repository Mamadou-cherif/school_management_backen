const express=require("express")
const router= express.Router()
const noteController= require("../controllers/note")

    router.post("/noteSelectBy", noteController.noteSelectBy)
    router.post("/calculeMoyenneParClasseEtSession", noteController.calculeMoyenneParClasseEtSession)
    router.get("/selectAllNote", noteController.selectAllNote)
    router.get("/selectNoteById/:id", noteController.selectNoteById)
    router.post("/addNote", noteController.addNote)
    router.put("/updateNote", noteController.updateNote)
    router.delete("/deleteNote/:id", noteController.deleteNote)

    
 module.exports= router 